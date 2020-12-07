const express = require('express');
const sousCategorieController = require('../controllers/sousCategorie');
const router = express.Router();

router.get('/souscategories', sousCategorieController.getSousCategories);
router.get('/souscategorie/:id', sousCategorieController.getSousCategorie);
router.get('/souscategorie/categorie/:id', sousCategorieController.findByCategorie);
router.put('/souscategorie', sousCategorieController.updateSousCategorie);
router.post('/souscategorie', sousCategorieController.createSousCategorie);
router.delete('/souscategorie/:id', sousCategorieController.deleteSousCategorie);


module.exports = router;
