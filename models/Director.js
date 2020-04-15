const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: 
    {
        type:String,
        maxlength:[50,'{PATH} alanı ({MAXLENGTH}) karakterden fazla olamaz.'],
        minlength:[2,'{PATH} alanı ({MİNLENGTH}) karakterden az olamaz.']
    },
    surname:     {
        type:String,
        maxlength:[50,'{PATH} alanı ({MAXLENGTH}) karakterden fazla olamaz.'],
        minlength:[2,'{PATH} alanı ({MİNLENGTH}) karakterden az olamaz.']
    },
    bio:     {
        type:String,
        maxlength:[1000,'{PATH} alanı ({MAXLENGTH}) karakterden fazla olamaz.'],
        minlength:[2,'{PATH} alanı ({MİNLENGTH}) karakterden az olamaz.']
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model('director',DirectorSchema);