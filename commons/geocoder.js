const geoCoder = require("node-geocoder");

//set the options in a json 
const options = {

    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: "https",
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null

}

//pass the json to the constructor given by library which will create and object and send us 
//new configured object of geocoder.
const geocoderExport = geoCoder(options);

module.exports = geocoderExport;