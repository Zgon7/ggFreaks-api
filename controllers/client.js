const Client = require('../models/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

exports.getClients = async (req, res, next) => {
    const clients = await Client.find();
    await res.json({
        clients
    });
};

exports.getClient = async (req, res, next) => {
    if (!req.params.id) {
        res.json({
            error: "Id Not Found"
        });
    }
    else {
        const client = await Client.findById(req.params.id);
        if (!client) {
            res.json({
                error: "client Not Found"
            });
        }
        else {
            res.json({
                client
            });
        }
    }
};

exports.createClient = async (req, res, next) => {
    if (!validator.isEmail(req.body.email.trim().toLowerCase())) {
        res.json({
            error: "Email not valid"
        })
    }
    const client = new Client({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 12),
    });
    await client.save();
    await res.json({
        message: 'Client created successfully!',
        client
    });
};

exports.updateClient = async (req, res, next) => {
    if (!req.userId) {
        await res.json({
            error: "Not Auth"
        });
    }
    else {
        const client = await Client.findById(req.userId);
        if (!client) {
            await res.json({
                error: "client Not Found"
            });
        }
        else {
            client.nom = req.body.nom;
            client.prenom = req.body.prenom;
            client.adresse = req.body.adresse;
            client.email = req.body.email;
            client.password = await bcrypt.hash(req.body.password, 12);

            await client.save();

            await res.json({
                message: 'Client updated successfully!',
                client
            });
        }
    }
};

exports.deleteClient = async (req, res, next) => {
    if (!req.params.id) {
        await res.json({
            error: "Id Not Found"
        });
    }
    else {
        const client = await Client.findById(req.params.id);
        if (!client) {
            await res.json({
                error: "Client Not Found"
            });
        } else {
            client.remove();

            await res.json({
                message: "client Removed"
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
    const client = await Client.findOne({email: req.body.email.trim().toLowerCase()});
    if (!client) {
        await res.json({
            error: "client Not Found"
        })
    }
    const isEqual = await bcrypt.compare(req.body.password, client.password);
    if (!isEqual) {
        await res.json({
            error: "Password Incorrect"
        })
    }
    else {
        const token = await jwt.sign(
            {
                userId: client._id.toString(),
                email: client.email
            },
            'ggfreaks',
        );

        await res.json({
            token: token,
            userId: client._id.toString(),
            role: 'CLIENT'
        });
    }

};
