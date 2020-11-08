const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commandeSchema = new Schema(
    {
        vendu:{
            type: Boolean,
            default : false,
            required: true
        },
        date:{
            type:Date,
            default: Date.now()
        },
        client: {type: Schema.Types.ObjectID, ref: 'Client'},

        produits:[
            {
                _id : {type: Schema.Types.ObjectID, ref: 'Produit'},
                qte: {type: Number, required: true}
            }
        ]
    });
module.exports = mongoose.model('Commande', commandeSchema);
