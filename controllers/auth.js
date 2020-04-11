const db = require('../models');
const bcrypt = require('bcryptjs');


// tested
const register = (req, res) => {
  
  if (!req.body.email || !req.body.password) return res.status(400).json({message: 'no email or password. These fields cannot be empty.'});

  db.User.findOne({ email: req.body.email}, (err, foundUser) => {
    if (err) return res.status(500).json(err);
    else if (foundUser) return res.status(400).json({message: 'This email is already registered.'})
    return;
  })
 
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
    
      db.User.create(newUser, (err, savedUser) => {
        if (err) return res.status(400).json({message: 'Cannot create new user. Make sure email is unique.'});
        // add jwt token here later
        // req.session.currentUser = {id: user._id}

        console.log(newUser)
        console.log(newUser._id)
        return res.json(user)
      });
    });
  });
};


const login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  if (!user.email || !user.password) return res.send(400).json({message: 'Missing email or password.'})

  db.User.findOne({email: user.email}, (err, foundUser) => {
    if (err) return res.send(400).json(err);
    else if (!foundUser) return res.send(400).json({message: 'Cannot find this user'});

    bcrypt.compare(user.password, foundUser.password, (err, match) => {
      if (err) return res.send(400).json({message: 'Error with password'});

      // req.session.currentUser = {id: foundUser._id}
      return res.send(foundUser)
      // if (match) {

      // }
    })
  })
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