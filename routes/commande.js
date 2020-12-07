const express = require('express');
const commandeController = require('../controllers/commande');
const router = express.Router();

router.get('/commandes', commandeController.getCommandes);
router.get('/mycommandes', commandeController.getmyCommandes);
router.get('/commande/:id', commandeController.getCommande);
router.put('/commande', commandeController.updateCommande);
router.post('/commande', commandeController.createCommande);


module.exports = router;
