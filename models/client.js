const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
        password:{
            type:String,
            required: true
        },
        email:{
            type:String,
            required: true
        },
        nom:{
            type:String,
            required: true
        },
        prenom:{
            type:String,
            required: true
        },
        adresse:{
            type:String,
            required: true
        },

    });
module.exports = mongoose.model('Client', clientSchema);
