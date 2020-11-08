const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();

router.get('/admins', adminController.getAdmins);
router.get('/admin', adminController.getAdmin);
router.put('/admin', adminController.updateAdmin);
router.post('/admin', adminController.createAdmin);
router.delete('/admin/:id', adminController.deleteAdmin);
router.post('/loginadmin', adminController.login);


module.exports = router;
