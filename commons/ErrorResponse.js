//A common Error response class which can be used amongst multiple classes to
//This error response is being used by global exception handler to send actual response
//meaning that we are just sending the POJO to global exception handler.

class ErrorResponse extends Error {

    constructor(message, statusCode) {

        super(message);
        this.statusCode = statusCode;

    }

}


module.exports = ErrorResponse;