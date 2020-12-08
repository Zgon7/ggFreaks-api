const express = require('express');
const produitController = require('../controllers/produit');
const router = express.Router();

router.get('/produits', produitController.getProduits);
router.get('/produit/:id', produitController.getProduit);
router.get('/produit/souscateg/:name', produitController.getBySousCategName);
router.put('/produit', produitController.updateProduit);
router.post('/produit', produitController.createProduit);
router.delete('/produit/:id', produitController.deleteProduit);


module.exports = router;
