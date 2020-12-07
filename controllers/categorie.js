const Categorie = require('../models/categorie');
const Admin = require('../models/admin');

exports.getCategories = async (req, res, next) => {
    const categories = await Categorie.find();
    await res.json({
        categories
    });
};

exports.getCategorie = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const categorie = await Categorie.findById(req.params.id);
        if (!categorie) {
            res.json({
                error: "categorie Not Found"
            });
        }
        else {
            res.json({
                categorie
            });
        }
    }
};

exports.createCategorie = async (req, res, next) => {
   /* if (!req.isAuth) {
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
            const categorie = new Categorie({
                nom: req.body.nom,
                image: req.body.image,
            });
            await categorie.save();
            await res.json({
                message: 'Categorie created successfully!',
                categorie
            });
       /* }
    }*/
};

exports.updateCategorie = async (req, res, next) => {
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
            const categorie = await Categorie.findById(req.userId);
            if (!categorie) {
                await res.json({
                    error: "categorie Not Found"
                });
            } else {
                categorie.nom = req.body.nom;
                categorie.image = req.body.image;

                await categorie.save();

                await res.json({
                    message: 'Categorie updated successfully!',
                    categorie
                });
            }
        }
    }
};

exports.deleteCategorie = async (req, res, next) => {
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
                const categorie = await Categorie.findById(req.params.id);
                if (!categorie) {
                    await res.json({
                        error: "Categorie Not Found"
                    });
                } else {
                    categorie.remove();

                    await res.json({
                        message: "categorie Removed"
                    });
                }
            }
        }
    }
};
