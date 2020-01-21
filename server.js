const express = require("express");
const dotenv = require("dotenv");


//Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT || 5000;

//routed services
const friendServices = require("./service/service_routes");

//Mounting services to handle urls  (takes the url and passes it to friends service)
app.use('/api/v1/friends', friendServices);






//port related code
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} and environment is ${process.env.NODE_ENV}`);
});
