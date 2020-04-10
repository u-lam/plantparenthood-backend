const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// AUTH
router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.post('/logout', ctrl.auth.logout);
router.get('/verify/:id', ctrl.auth.verify);

// USER
router.get('/users', ctrl.users.index); 
router.get('/users/:id', ctrl.users.show);
router.post('/users', ctrl.users.create);
router.put('/users/:id', ctrl.users.update);
router.delete('/users/:id', ctrl.users.destroy);

// PLANT
router.get('/plants', ctrl.posts.index);
router.get('/plants/:id', ctrl.posts.show);
router.post('/plants', ctrl.posts.create);
router.put('/plants/:id', ctrl.posts.update);
router.delete('/plants/:id', ctrl.posts.destroy);


module.exports = router;
