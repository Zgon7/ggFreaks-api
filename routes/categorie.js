const express = require('express');
const categorieController = require('../controllers/categorie');
const router = express.Router();

router.get('/categories', categorieController.getCategories);
router.get('/categorie/:id', categorieController.getCategorie);
router.put('/categorie', categorieController.updateCategorie);
router.post('/categorie', categorieController.createCategorie);
router.delete('/categorie/:id', categorieController.deleteCategorie);


module.exports = router;
