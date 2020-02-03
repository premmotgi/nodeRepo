const Friend = require("../model/friends");
const ErrorResponse = require("../commons/ErrorResponse");
const asyncHandler = require("../middlwares/asyncHandler");
//for location related code
const geocoder = require("../commons/geocoder");

//to deal with file path- we need to get extension of image...so
const path = require("path");


//description
//@desc gets all the friends 
//@route GET /api/v1/friends/
//@access Public
exports.getAllFriends = asyncHandler(async (req, res, next) => {

    //first the call will go to advacned filter middleware and then it will come to this api- advancedResult is set by advanced result
    //since advancedresult it middleware for getAllFriends- variables set by advacned results is visible here
    res.status(200).json(res.advancedResults);

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
        //store new data and return new data
        new: true,
        //run validators for mongoose
        runValidators: true
    });

    if (!responseObj) {
        return res.status(404).json({
            status: "FAILURE"
        })
    }
    res.status(200).json({
        status: "SUCCESS",
        friend: responseObj

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


//@desc upload photo 
//@route PUT /api/v1/friends/:id/photo
//@access Private
exports.uploadPhoto = asyncHandler(async (req, res, next) => {

    console.log(`upload photo api called`);

    const responseObj = await Friend.findById(req.params.id);

    //here next is for getting out of current context and then going to error context
    if (!responseObj) {
        return next(new ErrorResponse("Please Enter a valid userid", 404));
    }

    console.log(req.files);
    if (!req.files) {
        return next(new ErrorResponse("Please Upload a file", 400));
    }



    const file = req.files.file;
    //checking if an image file
    if (!file.mimetype.startsWith("image")) {
        return next(new ErrorResponse("Image type not file", 400));
    }

    //check file size
    if (file.size > process.env.MAX_FILE_UPLOAD_LIMIT) {
        return next(new ErrorResponse(`File size exceeds ${process.env.MAX_FILE_UPLOAD_LIMIT}`, 400));
    }

    //custom name the file for user and path.parse will help to extract the extension of the file
    file.name = `photo_${responseObj._id}${path.parse(file.name).ext}`;
    console.log(`Changed file name to ${file.name}`);

    //actual upload the file
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async callBack => {

        //callbacks with error if there is any
        if (callBack) {

            return next(new ErrorResponse(`Some error while saving file${file.name}`, 500));
        }

        await Friend.findByIdAndUpdate(req.params.id, { photo: file.name });

        console.log(`profile updated with id ${req.params.id}`);

        res.status(200).json({
            status: "SUCCESS",
            friend_name: responseObj.name,
            photo: file.name

        })


    })




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