const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const verifyToken = require('../middleware/verification');

// AUTH
router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.post('/logout', ctrl.auth.logout);
router.get('/verify/:id', ctrl.auth.verify);

// USER
router.get('/users', ctrl.users.index); 
router.get('/users/:id', ctrl.users.show);

// need to add verifyToken to the below.
router.put('/users/:id', ctrl.users.update);
router.delete('/users/:id', ctrl.users.destroy);

// PLANT
router.get('/plants', ctrl.plants.index);
router.get('/plants/:id', ctrl.plants.show);
// need to add verifyToken to the below. Tested with verifyToken and could not get past err
router.post('/plants', ctrl.plants.create);
router.put('/plants/:id', verifyToken, ctrl.plants.update);
router.delete('/plants/:id', verifyToken, ctrl.plants.destroy);


module.exports = router;
