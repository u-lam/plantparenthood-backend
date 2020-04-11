const db = require('../models');


const index =  (req, res) => {
 db.User.find({}, (err, foundUsers) => {
  if (err) return res.status(400).json({status: 400, error: 'Can"t get users'});
  
  return res.json(foundUsers);
  });
};


const show = (req, res) => {
  db.User.findById(req.params.id, (err, foundUser) => {
    if (err) return res.status(400).json({status: 400, error: 'Can"t find this user.'});
    
    return res.json(foundUser);
  });
};


const create = (req, res) => {
  db.User.create(req.body, (err, newUser) => {
      if (err) return res.status(400).json({status: 400, error: 'Can"t create new user. Please try again'});
      
      return res.json(newUser);
  });
};


const update = (req, res) => {
  db.User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
    if (err) return res.status(400).json({status: 400, error: 'Can"t find user with this ID. Please try again'});

    return res.json(updatedUser)
  });
};


const destroy = (req, res) => {
  db.User.findByIdAndDelete(req.params.id, (err, deletedUser)=> {
      if (err) return res.status(400).json({status: 400, error: 'Can"t delete user. Please try again'});

      return res.json(deletedUser);
  });
};


module.exports = {
  index,
  show,
  create,
  update,
  destroy
};