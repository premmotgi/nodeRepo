//this is a seeder file which will load the data from json file to the mongo onject

//since we are loading json file
const fs = require('fs');
//connection to db
const repo = require('mongoose');
//color the loggers
const colors = require('colors');
//environment variables access
const dotenv = require('dotenv');


///load env vars so that you can use with variable process
dotenv.config({ path: './config/config.env' });

//load document model that needs to be stored or deleted
const friendDoc = require('./model/friends');


//connect to database
repo.connect(process.env.MONGO_URI, {
    //to stop warnings from happening   
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true

});

//Read the json files
const friends = JSON.parse(fs.readFileSync(`${__dirname}/_data/friends.json`, 'utf-8'));


//import into db
const importData = async () => {

    try {

        //the data from file which is read, now will be put in database
        await friendDoc.create(friends);
        console.log('Data Imported.....'.green);

        //when you do async await, either you need to exit or pass the control to next flow
        process.exit();

    } catch (err) {
        console.error(err);
    }

}



//delete from db
const deleteData = async () => {

    try {
        //delete all
        await friendDoc.deleteMany();
        console.log('Data Deleted.....'.red);

        process.exit();

    } catch (err) {
        console.error(err);
    }

}

//arguments that we pass to node seeder [-i or -d]
//e.g to import all run "node seeder -i" / to delete "node seeder -d"
if (process.argv[2] === '-i') {

    importData();

} else if (process.argv[2] === '-d') {

    deleteData();
}