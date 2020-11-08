const Produit = require('../models/produit');
const Admin = require('../models/admin');

exports.getProduits = async (req, res, next) => {
    const produits = await Produit.find();
    await res.json({
        produits
    });
};

exports.getProduit = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const produit = await Produit.findById(req.params.id);
        if (!produit) {
            res.json({
                error: "produit Not Found"
            });
        }
        else {
            res.json({
                produit
            });
        }
    }
};

exports.createProduit = async (req, res, next) => {
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
            const produit = new Produit({
                nom: req.body.nom,
                prix: req.body.prix,
                image: req.body.image,
                desc: req.body.desc,
                stock: req.body.stock,
                categorie: req.body.categorie,
            });
            await produit.save();
            await res.json({
                message: 'Produit created successfully!',
                produit
            });
        }
    }
};

exports.updateProduit = async (req, res, next) => {
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
            const produit = await Produit.findById(req.body._id);
            if (!produit) {
                await res.json({
                    error: "produit Not Found"
                });
            } else {
                produit.nom = req.body.nom;
                produit.image = req.body.image;
                produit.prix = req.body.prix;
                produit.desc = req.body.desc;
                produit.stock = req.body.stock;
                produit.categorie = req.body.categorie;

                await produit.save();

                await res.json({
                    message: 'Produit updated successfully!',
                    produit
                });
            }
        }
    }
};

exports.deleteProduit = async (req, res, next) => {
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
            if (!req.params.id) {
                await res.json({
                    error: "Id Not Found"
                });
            } else {
                const produit = await Produit.findById(req.params.id);
                if (!produit) {
                    await res.json({
                        error: "Produit Not Found"
                    });
                } else {
                    produit.remove();

                    await res.json({
                        message: "produit Removed"
                    });
                }
            }
        }
    }
};
