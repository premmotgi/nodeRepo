const Friend = require("../model/friends");
const ErrorResponse = require("../commons/ErrorResponse");
const asyncHandler = require("../middlwares/asyncHandler");
//for location related code
const geocoder = require("../commons/geocoder");




//description
//@desc gets all the friends 
//@route GET /api/v1/friends/
//@access Public
exports.getAllFriends = asyncHandler(async (req, res, next) => {

    let query;
    //query form in json 
    const reqQuery = { ...req.query };

    //since mongo doesnt understand select in queries, we need to remove them
    const removeFields = ["select"];

    removeFields.forEach(param => delete reqQuery[param]);

    //converting into string
    let queryStr = JSON.stringify(reqQuery);

    //now if you want to perform any operation or updateion on query then you can do it by changing query and stuff
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    //passing the query as json back again to mongo, we dont need to await for response here becz we will do it after we get this data
    query = Friend.find(JSON.parse(queryStr));

    console.log(query);

    if (req.query.select) {
        //remove all commas from select query and join by space, because this way is only required to us
        const fields = req.query.select.split(",").join(' ');
        console.log(`Querying for select fields ${fields}`);
        query = query.select(fields);


    }

    const responseObj = await query;

    res.status(200).json({
        status: "SUCCESS",
        count: responseObj.length,
        friends: responseObj

    })




});


//@desc get a friend 
//@route GET /api/v1/friends/id
//@access Public
exports.getFriend = asyncHandler(async (req, res, next) => {

    const responseObj = await Friend.findById(req.params.id);

    if (!responseObj) {
        return res.status(404).json({
            status: "FAILURE",
            Error: `Resource Not Found with Id or key ${req.params.id}`
        })
    }
    res.status(200).json({
        status: "SUCCESS",
        friends: responseObj

    })


})


//@desc add a friend 
//@route POST /api/v1/friends/
//@access Private
exports.addFriend = asyncHandler(async (req, res, next) => {


    const responseObject = await Friend.create(req.body);

    res.status(201).json({

        status: "SUCCESS",
        data: responseObject

    });



})


//@desc update a friend 
//@route PUT /api/v1/friends/id
//@access Private
exports.updateFriend = asyncHandler(async (req, res, next) => {



    const responseObj = await Friend.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!responseObj) {
        return res.status(404).json({
            status: "FAILURE"
        })
    }
    res.status(200).json({
        status: "SUCCESS",
        friends: responseObj

    })

});

//@desc delete a friend 
//@route DELETE /api/v1/friends/id
//@access Private
exports.deleteFriend = asyncHandler(async (req, res, next) => {

    try {

        const responseObj = await Friend.findByIdAndDelete(req.params.id);

        if (!responseObj) {
            return res.status(404).json({
                status: "FAILURE"
            })
        }
        res.status(200).json({
            status: "SUCCESS",
            friends: responseObj

        })
    } catch (err) {
        console.log(`Error: ${err.message}`.red.bold);
        next(err);

    }

});



//rest controller to find nearby friends
//route GET /api/v1/friends/radius/:zipcode/:distance
exports.getFriendByDistance = asyncHandler(async (req, res, next) => {

    //copy from request url
    const { zipcode, distance } = req.params;

    //this method will giv long and lat
    const loc = await geocoder.geocode(zipcode);

    //get values from arr NOTE- DOnt miss spelling, it will cost error without warning 
    //cold errors will lead into undirectional debusgging
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

    console.log(lat, "---", lng);
    //distance near =   distance you want nearby / radius of earth
    //radius of earth = 3963 miles 

    const radiusOfEarth = 3963;
    const radiusToFindIn = distance / radiusOfEarth;


    //this is the by def format given by mongoDB
    const friendsNearby = await Friend.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radiusToFindIn]
            }
        }
    });
    console.log(friendsNearby)
    res.status(200).json({

        status: "SUCCESS",
        count: friendsNearby.length,
        NearBy_friends: friendsNearby

    });

});