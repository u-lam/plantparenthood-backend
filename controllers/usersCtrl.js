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


const update = (req, res) => {
  db.User.findByIdAndUpdate(req.body.id, req.body, {new: true}, (err, updatedUser) => {
    if (err) return res.status(400).json({status: 400, error: 'Can"t find user with this ID. Please try again'});
    return res.json(updatedUser)
  });
};


const destroy = (req, res) => {
  db.User.findByIdAndDelete(req.params.id, (err, deletedUser)=> {
      if (err) return res.status(400).json({status: 400, error: 'Can"t delete user. Please try again'});  
      db.Plant.deleteMany({ user: req.params.id }, (err, deletedPlants) => {
        if (err) return res.status(400).json({status: 400, error: 'Can"t delete the user"s plant(s). Please try again'})
        return res.json(deletedUser);
      });
  });
};


module.exports = {
  index,
  show,
  update,
  destroy
};