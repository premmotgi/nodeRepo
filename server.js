const express = require("express");
const dotenv = require("dotenv");


//Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 5000;


//get All friends
app.get('/api/v1/friends', (req, res) => {

    res.status(200).json({ status: "SUCCESS", friedList: [{ id: 1, name: "nick" }, { id: 2, name: "yudi" }, { id: 3, name: "abraham" }] });

});

//get a friend
app.get('/api/v1/friends/:id', (req, res) => {

    res.status(200).json({ status: "SUCCESS", fried: { id: req.params.id, name: "nick" } });

});


//add a friend
app.post('/api/v1/friends', (req, res) => {

    res.status(200).json({ status: "CREATED", friedList: [{ id: 1, name: "nick" }, { id: 2, name: "yudi" }, { id: 3, name: "abraham" }] });

});


//update a friend
app.put('/api/v1/friends', (req, res) => {

    res.status(200).json({ status: "UPDATED", friedList: [{ id: 1, name: "nick" }, { id: 2, name: "yudi" }, { id: 3, name: "abraham" }] });

});

//update a friend
app.delete('/api/v1/friends/:id', (req, res) => {

    res.status(200).json({ status: "DELETED", friedList: { id: req.params.id, name: "nick" } });

});







//port related code
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} and environment is ${process.env.NODE_ENV}`);
});
