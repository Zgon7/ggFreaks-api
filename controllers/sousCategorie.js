const SousCategorie = require('../models/sousCategorie');
const Admin = require('../models/admin');

exports.getSousCategories = async (req, res, next) => {
    const sousCategories = await SousCategorie.find();
    await res.json({
        sousCategories
    });
};

exports.findByCategorie = async (req, res, next) => {
    const sousCategories = await SousCategorie.find({categorie: req.params.id});
    await res.json({
        sousCategories
    });
};


exports.getSousCategorie = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const sousCategorie = await SousCategorie.findById(req.params.id);
        if (!sousCategorie) {
            res.json({
                error: "sousCategorie Not Found"
            });
        }
        else {
            res.json({
                sousCategorie
            });
        }
    }
};

exports.createSousCategorie = async (req, res, next) => {
    /*if (!req.isAuth) {
        res.json({
            error: "Not Auth"
        });
    } else {
        const admin = await Admin.findById(req.userId);
        if (!admin) {
            res.json({
                error: "Not admin"
            });
        } else {*/
            const sousCategorie = new SousCategorie({
                nom: req.body.nom,
                categorie: req.body.categorie,
            });
            await sousCategorie.save();
            await res.json({
                message: 'SousCategorie created successfully!',
                sousCategorie
            });
        /*}
    }*/
};

exports.updateSousCategorie = async (req, res, next) => {
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
            const sousCategorie = await SousCategorie.findById(req.userId);
            if (!sousCategorie) {
                await res.json({
                    error: "sousCategorie Not Found"
                });
            } else {
                sousCategorie.nom = req.body.nom;
                sousCategorie.categorie = req.body.categorie;

                await sousCategorie.save();

                await res.json({
                    message: 'SousCategorie updated successfully!',
                    sousCategorie
                });
            }
        }
    }
};

exports.deleteSousCategorie = async (req, res, next) => {
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
                const sousCategorie = await SousCategorie.findById(req.params.id);
                if (!sousCategorie) {
                    await res.json({
                        error: "SousCategorie Not Found"
                    });
                } else {
                    sousCategorie.remove();

                    await res.json({
                        message: "sousCategorie Removed"
                    });
                }
            }
        }
    }
};
