const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect('mongodb+srv://movie_user:berk1@movieapi-0fcyc.mongodb.net/test?retryWrites=true&w=majority',{useMongoClient:true})
    mongoose.connection.on('open',()=>{
        console.log('MongoDB: Connected');
    });

    mongoose.connection.on('error',(err)=>{
    console.log('MongoDB: Error',err);
    });
}