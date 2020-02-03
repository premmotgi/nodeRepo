const express = require("express");
const router = express.Router();


//use of advanced results
const Friend = require("../model/friends");
const advancedResults = require("../middlwares/advancedResults");


//take all the a controllers and map to respective vars
const {

    getAllFriends,
    getFriend,
    deleteFriend,
    updateFriend,
    addFriend,
    getFriendByDistance,
    uploadPhoto

} = require("../controllers/friendsController");


//routing for nearby frinds
router.route("/radius/:zipcode/:distance").get(getFriendByDistance);


//calling each controller based on request url.
//for get all first friend will execute and then get all friends will execute.
router.route("/")
    .get(advancedResults(Friend, ""), getAllFriends)
    .post(addFriend);

//based on request url and method the appropriate controller is called.
router.route("/:id")
    .get(getFriend)
    .put(updateFriend)
    .delete(deleteFriend);


//router for uploading a photo
router.route("/:id/:photo")
    .put(uploadPhoto);


//to make the router work
module.exports = router;






//----------------------------------------------------------
// //NOTE: since the urls are passed from serverjs, we dont need to mention whole url and only 
// //the query part is required.

// //get All friends
// router.get('/', (req, res) => {

//     res.status(200).json({ status: "SUCCESS", friedList: [{ id: 1, name: "nick" }, { id: 2, name: "yudi" }, { id: 3, name: "abraham" }] });

// });




// //get a friend
// router.get('/:id', (req, res) => {

//     res.status(200).json({ status: "SUCCESS", fried: { id: req.params.id, name: "nick" } });

// });


// //add a friend
// router.post('/', (req, res) => {

//     res.status(201).json({ status: "CREATED", friedList: [{ id: 1, name: "nick" }, { id: 2, name: "yudi" }, { id: 3, name: "abraham" }] });

// });


// //update a friend
// router.put('/', (req, res) => {

//     res.status(200).json({ status: "UPDATED", friedList: [{ id: 1, name: "nick" }, { id: 2, name: "yudi" }, { id: 3, name: "abraham" }] });

// });

// //update a friend
// router.delete('/:id', (req, res) => {

//     res.status(200).json({ status: "DELETED", friedList: { id: req.params.id, name: "nick" } });

// });
