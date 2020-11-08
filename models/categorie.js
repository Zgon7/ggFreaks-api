const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorieSchema = new Schema(
    {
        nom:{
            type:String,
            required: true
        },
        image:{
            type:String,

        }

    });
module.exports = mongoose.model('Categorie', categorieSchema);
