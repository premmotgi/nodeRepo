//a common way of handleing performning advanced queries on the application.
const advancedResults = (model, populate) => async (req, res, next) => {

    let query;
    //query form in json 
    const reqQuery = { ...req.query };

    //since mongo doesnt understand select in queries, we need to remove them
    const removeFields = ["select", "sort"];

    removeFields.forEach(param => delete reqQuery[param]);

    //converting into string
    let queryStr = JSON.stringify(reqQuery);

    //now if you want to perform any operation or updateion on query then you can do it by changing query and stuff
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    //passing the query as json back again to mongo, we dont need to await for response here becz we will do it after we get this data
    query = model.find(JSON.parse(queryStr));


    if (req.query.select) {
        //remove all commas from select query and join by space, because this way is only required to us
        const fields = req.query.select.split(",").join(' ');
        console.log(`Querying for select fields ${fields}`);
        query = query.select(fields);


    }

    if (req.query.sort) {
        //remove all commas from select query and join by space, because this way is only required to us
        const sortBy = req.query.sort.split(",").join(' ');
        console.log(`Querying for sortby fields ${sortBy}`);
        query = query.sort(sortBy);


    }

    const responseObj = await query;

    res.advancedResults = {

        status: "SUCCESS",
        count: responseObj.length,
        data: responseObj

    }

    //go back to our get all controller
    next();


}



module.exports = advancedResults;