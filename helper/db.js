const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect('mongodb://movie_user:abcd1234@ds015194.mlab.com:15194/heroku_rm8njbg4',{useMongoClient:true})
    mongoose.connection.on('open',()=>{
        console.log('MongoDB: Connected');
    });

    mongoose.connection.on('error',(err)=>{
    console.log('MongoDB: Error',err);
    });

    mongoose.Promise = global.Promise;
}