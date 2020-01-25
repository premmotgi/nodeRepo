const repo = require("mongoose");

//since promise is involved we'll use async await
const connectDB = async () => {

    //returns a promise
    const repoConncection = await repo.connect(process.env.MONGO_URI, {
        //to stop warnings from happening   
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true

    });

    console.log(`Conncetion established with Repository: ${repoConncection.connection.host}`);
}


module.exports = connectDB;