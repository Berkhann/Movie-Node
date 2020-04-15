const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: 
    {
        type:String,
        unique:true,
        minlength:[5,'{PATH} alanı ({MİNLENGTH}) karakterden az olamaz.']
    },
    password:     {
        type:String,
        minlength:[5,'{PATH} alanı ({MİNLENGTH}) karakterden az olamaz.']
    }
});

module.exports = mongoose.model('user',UserSchema);