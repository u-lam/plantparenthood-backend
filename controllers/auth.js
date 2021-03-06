const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = (req, res) => {
  db.User.findOne({ email: req.body.email}, (err, foundUser) => {
    if (err) return res.status(500).json(err);
    else if (foundUser) return res.status(400).json({message: 'This email is already registered.'})
    return;
  })
 
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).json(err);
    bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
      if (err) return res.status(500).json(err);  
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPwd
      }
    
      db.User.create(newUser, (err, savedUser) => {
        if (err) return res.status(500).json(err);
        const token = jwt.sign(
          {
            email: savedUser.email,
            _id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName
          }, process.env.JWT_SECRET,
          { expiresIn: "30 days" } );
        return res.status(200).json({
          message: 'User Created', 
          token, 
          savedUser
        });
      });
    });
  });
};


const login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  if (!user.email || !user.password) return res.status(400).json({message: 'Missing email or password.'})
  db.User.findOne({email: user.email}, (err, foundUser) => {
    if (err) return res.status(400).json(err);
    else if (!foundUser) return res.status(400).json({message: 'Cannot find this user'});

    bcrypt.compare(user.password, foundUser.password, (err, match) => {
      if (err) return res.status(400).json({message: 'Error with password'});
      if (match) {
        const token = jwt.sign(
          {
            email: foundUser.email,
            _id: foundUser._id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName
          }, process.env.JWT_SECRET,
          { expiresIn: "30 days"} );
        return res.status(200).json({message: 'User Logged In', token, foundUser});
      } else {
        return res.status(400).json(err);
      }
    })
  })
}


const logout = (req, res) => {
  if (!req.session.currentUser) return res.status(401).send('unauthorized');
  req.session.destroy(err => {
    return res.sendStatus(200);
  })
}


const verify = (req, res) => {
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) return res.status(400).json({message: 'No user found.'})
    return res.json(foundUser)
  })
}


module.exports = {
  register,
  login,
  logout,
  verify
}