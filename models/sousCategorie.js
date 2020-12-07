const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SousCategorieSchema = new Schema(
    {
        nom: {
            type:String,
            required: true
        },

        categorie: {type: Schema.Types.ObjectID, ref: 'Categorie'},
    });
module.exports = mongoose.model('SousCategorie', SousCategorieSchema);
