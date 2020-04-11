const db = require('../models');
const bcrypt = require('bcryptjs');

const register = (req, res) => {
  
  // checking to see if email or password fields are null
  if (!newUser.email || !newUser.password) return res.status(400).send('no email or password. These fields cannot be empty.');
  // checking to see if email already exists
  db.User.findOne({ email: req.body.email}, (err, foundUser) => {
    if (err) return res.status(500).json(err);
    if (foundUser) return res.status(400).send('This email is already registered.')
  })
  // hash pwd
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).json(err);
    bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
      if (err) return res.status(500).json(err);
      req.body.password = hashedPwd;
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location
      }
      db.User.create(newUser, (err, user) => {
        if (err) return res.status(400).json({message: 'Cannot create new user. Make sure email is unique.'});
        req.session.currentUser = {id: user._id}
        return res.json(user)
      });
    });
  });
};


const login = (req, res) => {
  
}


const logout = (req, res) => {
  
}


const verify = (req, res) => {
  
}

module.exports = {
  register,
  login,
  logout,
  verify
}