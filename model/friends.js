const repo = require("mongoose");
//using slugify to perform operations on friend document, before saving it to DB.
const slugify = require("slugify");

//using geocoder in our document code.
const geocoder = require("../commons/geocoder");

const friendSchema = new repo.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        unique: true,
        trim: true,
        maxlength: [50, "name cannot be greater than 50 characters"]
    },
    //this is the slug field which will be set by slugify api, and which can be used by front end code
    //for any random purposes such as url link.
    slug: String,
    userId: Number,
    website: { type: String },
    address: String,
    location: {

        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        Street: String,
        City: String,
        State: String,
        Zipcode: String,
        Country: String

    },
    priority: {
        type: Number,
        min: [1, "Min 1"],
        max: [10, "Max 10"]

    }

});

//save mentions before save we have to perfrom
//here we didnt use arrow functions because we need to use this, and they handle it differently.
friendSchema.pre('save', function fn(next) {
    //this refers to the document/ above friend doc that is aboput to ge tsaved.
    console.log(`updating slug fireld for our document with name ${this.name}`);
    this.slug = slugify(this.name, {
        lower: true
    })

    //we must proceed to next method passed as a reference to pre.
    //if we dont do it code will result in infiinite loop.
    next();
});

//now here we will take the address from our existing doc which user will put in post and
//use that to pass to geocoder api which will return response. We will store this reponse in our location field in document that
//needs to be saved.
//and since the geocoder is implemented with promise, we can use async await, using this wont affect here since the implementation is
//covered by grocoder api
friendSchema.pre('save', async function (next) {

    console.log(`Calling geocoder api to get the location details for address ${this.address}`);

    //api returns the array with only one object and has many elements in it.
    const locationDetails = await geocoder.geocode(this.address);

    //copying data from response from api to our own object.
    this.location = {
        //by def we have set it to point, for our relevance
        type: 'Point',
        coordinates: [locationDetails[0].longitude, locationDetails[0].latitude],
        formattedAddress: locationDetails[0].formattedAddress,
        Street: locationDetails[0].streetName,
        City: locationDetails[0].city,
        State: locationDetails[0].stateCode,
        Zipcode: locationDetails[0].zipcode,
        Countr: locationDetails[0].countryName,
    }

    //move forward
    next();
});


module.exports = repo.model('Friend', friendSchema);



