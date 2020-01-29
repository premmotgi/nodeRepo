//A global exception handler, if error is passed with next then code will come in the end here and this piece of code
//will handle that error thingy to make sure system doesnt go in infinite loop.

const errorHandler = (err, req, res, next) => {

    console.log(err.stack.red);


    res.status(500).json({

        status: "Failure",
        Error: err.message


    });


}
module.exports = errorHandler;

