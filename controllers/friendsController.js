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
exports.getFriend = (req, res, next) => {

    res.status(200).json({ status: "SUCCESS", fried: { id: req.params.id, name: "nick" } });

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
exports.updateFriend = (req, res, next) => {

    res.status(200).json({ status: "UPDATED", friedList: [{ id: 1, name: "nick" }, { id: 2, name: "yudi" }, { id: 3, name: "abraham" }] });

}

//@desc delete a friend 
//@route DELETE /api/v1/friends/id
//@access Private
exports.deleteFriend = (req, res, next) => {

    res.status(200).json({ status: "DELETED", friedList: { id: req.params.id, name: "nick" } });

}



