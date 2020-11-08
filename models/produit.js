const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produitSchema = new Schema(
    {
       prix:{
            type:Number,
            required: true
        },
        image:{
            type:String,
        },
        nom:{
            type:String,
            required: true
        },
        desc:{
            type:String,
        },
        stock:{
            type:Number,
            required: true
        },
        categorie: {type: Schema.Types.ObjectID, ref: 'Categorie'},
    });
module.exports = mongoose.model('Produit', produitSchema);
