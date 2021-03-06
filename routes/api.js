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
router.put('/users/:id', verifyToken, ctrl.users.update);
router.delete('/users/:id', verifyToken, ctrl.users.destroy);


// PLANT
router.get('/plants', ctrl.plants.index);   // plants that have been donated (no user), up for adoption
router.put('/plants/donate/:id', verifyToken, ctrl.plants.donate) 
router.put('/plants/adopt/:id', verifyToken, ctrl.plants.adopt) 
router.get('/plants/:id', ctrl.plants.show);
router.post('/plants', verifyToken, ctrl.plants.create);
router.put('/plants/:id', verifyToken, ctrl.plants.update);
router.delete('/plants/:id', verifyToken, ctrl.plants.destroy);


module.exports = router;
