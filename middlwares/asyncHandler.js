// this handler will recieve async method and execute it as a promise,
//since proomise and async await botha re same...it doesnt matter how does it do so.
//passed method will be executed and if any error occurs then it is passed to middleware.
////basically we have removed try catch with use of promise and resolve.

const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next))
        .catch(next);

module.exports = asyncHandler;