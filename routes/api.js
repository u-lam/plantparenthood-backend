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
router.get('/plants',verifyToken, ctrl.plants.index);   // plants that have been donated (no user), up for adoption
router.get('/myplants', verifyToken, ctrl.plants.indexUser);  // plants that belong to a user
router.get('/plants/:id', ctrl.plants.show);
router.post('/plants', verifyToken, ctrl.plants.create);
router.put('/plants/:id', verifyToken, ctrl.plants.update);
router.delete('/plants/:id', verifyToken, ctrl.plants.destroy);


module.exports = router;
