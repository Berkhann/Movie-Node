const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title:{
        type:String,
        required: [true,'{PATH} alanı zorunludur.'],
        maxlength:[20,'{PATH} alanı ({MAXLENGTH}) karakterden fazla olamaz.'],
        minlength:[2,'{PATH} alanı ({MİNLENGTH}) karakterden az olamaz.']
    },
    imdb_score:Number,
    category:{
        type:String,
        maxlength:[30,'{PATH} alanı ({MAXLENGTH}) karakterden fazla olamaz.'],
        minlength:[2,'{PATH} alanı ({MİNLENGTH}) karakterden az olamaz.']
    },
    country:{
        type:String,
        maxlength:[30,'{PATH} alanı ({MAXLENGTH}) karakterden fazla olamaz.'],
        minlength:[2,'{PATH} alanı ({MİNLENGTH}) karakterden az olamaz.']
    },
    year:Number,
    director_id: Schema.Types.ObjectId,
    createdDate:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('movie',MovieSchema);