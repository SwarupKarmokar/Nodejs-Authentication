const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

mongoose.connect('mongodb://127.0.0.1:27017/password_db');


//accuire the connectiontion
const db = mongoose.connection;


//error
db.on('error', console.error.bind(console, 'error in connecting to db'));

//up and runnning
db.once('open', function() {
    console.log("successfully connected to the database");
});