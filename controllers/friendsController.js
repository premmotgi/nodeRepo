const Friend = require("../model/friends");
const ErrorResponse = require("../commons/ErrorResponse");
const asyncHandler = require("../middlwares/asyncHandler");
//description
//@desc gets all the friends 
//@route GET /api/v1/friends/
//@access Public
exports.getAllFriends = asyncHandler(async (req, res, next) => {


    const responseObj = await Friend.find();
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



