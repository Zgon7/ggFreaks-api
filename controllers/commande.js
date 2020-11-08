const Commande = require('../models/commande');
const Admin = require('../models/admin');
const Client = require('../models/client');

exports.getCommandes = async (req, res, next) => {
    if (!req.isAuth) {
        res.json({
            error: "Not Auth"
        });
    } else {
        const admin = await Admin.findById(req.userId);
        if (!admin) {
            res.json({
                error: "Not admin"
            });
        } else {
            const commandes = await Commande.find();
            await res.json({
                commandes
            });
        }
    }
};

exports.getmyCommandes = async (req, res, next) => {
    if (!req.isAuth) {
        res.json({
            error: "Not Auth"
        });
    } else {
        const client = await Client.findById(req.userId);
        if (!client) {
            res.json({
                error: "Not client"
            });
        } else {
            const commandes = await Commande.find({client: client._id.toString()});
            await res.json({
                commandes
            });
        }
    }
};

exports.getCommande = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const commande = await Commande.findById(req.params.id);
        if (!commande) {
            res.json({
                error: "commande Not Found"
            });
        }
        else {
            res.json({
                commande
            });
        }
    }
};

exports.createCommande = async (req, res, next) => {
    if (!req.isAuth) {
        res.json({
            error: "Not Auth"
        });
    } else {
            const commande = new Commande({
                vendu: req.body.vendu,
                client: req.userId,
                produits: req.body.produits
            });
            await commande.save();
            await res.json({
                message: 'Commande created successfully!',
                commande
            });
        }
};

exports.updateCommande = async (req, res, next) => {
    if (!req.isAuth) {
        res.json({
            error: "Not Auth"
        });
    } else {
            const commande = await Commande.findById(req.body._id);
            if (!commande) {
                await res.json({
                    error: "commande Not Found"
                });
            } else {
                commande.vendu = req.body.vendu;
                commande.client = req.body.client;
                commande.produits = req.body.produits;

                await commande.save();

                await res.json({
                    message: 'Commande updated successfully!',
                    commande
                });
            }
        }
};
