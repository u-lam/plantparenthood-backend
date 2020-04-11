const db = require('../models');

const index = async (req, res) => {
  try {
    const plants = await db.Plant.find({ user: req.user._id})
    if (!plants) return res.status(404).json({error: 'Can"t get plants'});
    return res.json(plants)
  } catch (err) {
    return res.status(500).json('error on index')
  }
}


// const show = (req, res) => {
//   db.Plant.findById(req.params.id)
//   .populate('user', 'firstName lastName _id')
//   .exec((err, foundPlant) => {
//       if (err) return res.status(404).json({status: 400, error: 'Can"t find plant with this ID.'});
      
//       return res.json(foundPlant)
//   })
// }

// TEST THIS ROUTE!!!
const show = async (req, res) => {
  try {
    const plant = await db.Plant.findOne({ _id: req.params.id})
    // comment out populate and exec if fail
    .populate('user', 'firstName lastName _id')
    .exec()
    if (!plant) return res.status(404).json({error: 'Can"t find plant with this ID.'});
    return res.json(plant)
  } catch (err) {
    return res.status(500).json('error on show')
  }  
}



const create = async (req, res) => {

  // if (!req.session.currentUser) return res.status(401).json({error: 'You are not authorized. Please log in'})
  // if (!req.body.name) return res.status(400).json({error: 'Please enter a name for this plant'})
  // if (!req.body.sunlight) return res.status(400).json({error: 'Please let us know how much sunlight this plant requires.'})
  // if (!req.body.water) return res.status(400).json({error: 'Please let us know how much water this plant requires.'})

  // req.body.user = req.session.currentUser.id   
//   db.Plant.create(req.body, (err, newPlant) => {
//     if (err) return res.status(400).json({status: 400, error: 'Unable to create new plant.'});

//     return res.json(newPlant);
// });
  try {
    const newPlant = await db.Plant.create(req.body);
    if (!newPlant) return res.status(404).json({error: 'Plant could not be created'});
    return res.json(newPlant);
  } catch (err) {
    return res.status(500).json('error on create')
  };
};

// Protect the route so only authorized users can update the plant
const update = async (req, res) => {
  try {
    const updatedPlant = await db.Plant.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (!updatedPlant) return res.status(404).json({error: 'Plant with this ID could not be found, or you are not authorized to edit this plant.' });
    return res.json(updatedPlant)
  } catch (err) {
    return res.status(500).json(err)
  };
};


// Protect the route so only authorized users can delete the plant
const destroy = async (req, res) => {
  try {
      const deletedPlant = await db.Plant.findByIdAndDelete({ _id: req.params.id });
      if (!deletedPlant) return res.status(404).json({error: 'Plant with that ID could not be found, or you are not authorized to delete this plant'});
      return res.json(deletedPlant);
  }   catch (err) {
      return res.status(500).json(err);
  };
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}