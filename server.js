const express = require("express");
const dotenv = require("dotenv");
const morganLogger = require("morgan");


//Load env vars
dotenv.config({ path: "./config/config.env" });




const app = express();
const PORT = process.env.PORT || 5000;

//routed services
const friendServices = require("./service/service_routes");

//load common logger for calls
//const logger = require("./middlwares/logger");
//using middleware by morgan is more better/light option
app.use(morganLogger('dev'));


//Mounting services to handle urls  (takes the url and passes it to friends service)
app.use('/api/v1/friends', friendServices);






//port related code
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} and environment is ${process.env.NODE_ENV}`);
});
