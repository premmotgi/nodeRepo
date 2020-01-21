//ususally middleware contains any random code that you do,
//considering unified logging be part of it


const logger = (req, res, next) => {

    console.log(

        `${req.method} -> ${req.protocol}:\\${req.host}${req.originalUrl}`

    );

    //all middlewares call the next method.
    next();
};

//export, so that it can be used in other classes

module.exports = logger;