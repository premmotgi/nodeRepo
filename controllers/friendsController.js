const Friend = require("../model/friends");

//description
//@desc gets all the friends 
//@route GET /api/v1/friends/
//@access Public
exports.getAllFriends = async (req, res, next) => {

    try {

        const responseObj = await Friend.find();
        res.status(200).json({
            status: "SUCCESS",
            count: responseObj.length,
            friends: responseObj

        })
    } catch (err) {
        console.log(`Error: ${err.msg}`.red.bold);
        res.status(400).json({
            status: "FAILURE",

        });
    }


}


//@desc get a friend 
//@route GET /api/v1/friends/id
//@access Public
exports.getFriend = async (req, res, next) => {


    try {

        const responseObj = await Friend.findById(req.params.id);

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
        console.log(`Error: ${err.msg}`.red.bold);
        res.status(400).json({
            status: "FAILURE",

        });
    }

}


//@desc add a friend 
//@route POST /api/v1/friends/
//@access Private
exports.addFriend = async (req, res, next) => {


    const responseObject = await Friend.create(req.body);

    res.status(201).json({

        status: "SUCCESS",
        data: responseObject

    });

}


//@desc update a friend 
//@route PUT /api/v1/friends/id
//@access Private
exports.updateFriend = async (req, res, next) => {

    try {

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
    } catch (err) {
        console.log(`Error: ${err.msg}`.red.bold);
        res.status(400).json({
            status: "FAILURE",

        });
    }

}

//@desc delete a friend 
//@route DELETE /api/v1/friends/id
//@access Private
exports.deleteFriend = async (req, res, next) => {

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
        console.log(`Error: ${err.msg}`.red.bold);
        res.status(400).json({
            status: "FAILURE",

        });
    }

}



