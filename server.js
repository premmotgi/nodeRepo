const express = require("express");
const dotenv = require("dotenv");
const morganLogger = require("morgan");
const connectRepo = require("./config/db");

//Load env vars
dotenv.config({ path: "./config/config.env" });




const app = express();
const PORT = process.env.PORT || 5000;
connectRepo();

//routed services
const friendServices = require("./service/service_routes");

//load common logger for calls
//const logger = require("./middlwares/logger");
//using middleware by morgan is more better/light option
app.use(morganLogger('dev'));


//Mounting services to handle urls  (takes the url and passes it to friends service)
app.use('/api/v1/friends', friendServices);


//global exception handler







//port related code
//with the help of server variable you can close or start the server by code.
const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} and environment is ${process.env.NODE_ENV}`);
});


process.on('unhandledRejection', (err, promise) => {

    console.log(`Error: ${err.message}`);

    //stop the server 1- true
    server.close(() => { process.exit(1) });

});
