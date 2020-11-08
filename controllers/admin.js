const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

exports.getAdmins = async (req, res, next) => {
    const admins = await Admin.find();
    await res.json({
        admins
    });
};

exports.getAdmin = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            res.json({
                error: "admin Not Found"
            });
        }
        else {
            res.json({
                admin
            });
        }
    }
};

exports.createAdmin = async (req, res, next) => {
    if (!validator.isEmail(req.body.email.trim().toLowerCase())) {
        res.json({
            error: "Email not valid"
        })
    }
    const admin = new Admin({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
    });
    await admin.save();
    await res.json({
        message: 'Admin created successfully!',
        admin
    });
};

exports.updateAdmin = async (req, res, next) => {
    if (!req.userId) {
        await res.json({
            error: "Not Auth"
        });
    }
    else {
        const admin = await Admin.findById(req.userId);
        if (!admin) {
            await res.json({
                error: "admin Not Found"
            });
        }
        else {
            admin.email = req.body.email;
            admin.password = await bcrypt.hash(req.body.password, 12);

            await admin.save();

            await res.json({
                message: 'Admin updated successfully!',
                admin
            });
        }
    }
};

exports.deleteAdmin = async (req, res, next) => {
    if (!req.params.id) {
        await res.json({
            error: "Id Not Found"
        });
    }
    else {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            await res.json({
                error: "Admin Not Found"
            });
        } else {
            admin.remove();

            await res.json({
                message: "admin Removed"
            });
        }
    }
};

exports.login = async (req, res, next) => {
    if (!validator.isEmail(req.body.email.trim().toLowerCase())) {
        res.json({
            error: "Email not valid"
        })
    }
    const admin = await Admin.findOne({email: req.body.email.trim().toLowerCase()});
    if (!admin) {
        await res.json({
            error: "admin Not Found"
        })
    }
    const isEqual = await bcrypt.compare(req.body.password, admin.password);
    if (!isEqual) {
        await res.json({
            error: "Password Incorrect"
        })
    }
    else {
        const token = await jwt.sign(
            {
                userId: admin._id.toString(),
                email: admin.email
            },
            'ggfreaks',
        );

        await res.json({
            token: token,
            userId: admin._id.toString(),
            role: 'ADMIN'
        });
    }


};
