const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: 
    {
        type:String,
        unique:true,
        maxlength:[50,'{PATH} alanı ({MAXLENGTH}) karakterden fazla olamaz.'],
        minlength:[5,'{PATH} alanı ({MİNLENGTH}) karakterden az olamaz.']
    },
    password:     {
        type:String,
        maxlength:[50,'{PATH} alanı ({MAXLENGTH}) karakterden fazla olamaz.'],
        minlength:[5,'{PATH} alanı ({MİNLENGTH}) karakterden az olamaz.']
    }
});

module.exports = mongoose.model('user',UserSchema);