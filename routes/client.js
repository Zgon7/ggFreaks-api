const express = require('express');
const clientController = require('../controllers/client');
const router = express.Router();

router.get('/clients', clientController.getClients);
router.get('/client/:id', clientController.getClient);
router.put('/client', clientController.updateClient);
router.post('/client', clientController.createClient);
router.delete('/client/:id', clientController.deleteClient);
router.post('/login', clientController.login);


module.exports = router;
