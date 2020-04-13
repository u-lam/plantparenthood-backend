const db = require('../models');

// no user associations. TESTED. Don't want to protect this so a user can see all plants
// const index = async (req, res) => {
//   try {
//     const plants = await db.Plant.find()
//     if (!plants) return res.status(404).json({error: 'Cannot get plants'})
//     return res.json(plants);
//   } catch (err) {
//     return res.status(500).json('error on index')
//   };
// };

const index = (req, res) => {
  db.Plant.find({})
  .populate('user', 'firstName lastName _id')
  .exec((err, allPlants) => {
    if (err) return res.status(404).json({status: 400, error: 'Cannot get all plants.'});
    return res.json(allPlants)
  })
}

// no user associations. TESTED. Don't need to protect so anyone can find this plant
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


// no user associations. TESTED. Will need user auth
const create = async (req, res) => {
  console.log(req.body)
  console.log(req.body.user)  //undefined
 
  // if (!decodedUser) return res.status(401).json({error: 'You are not authorized. Please log in'})

  if (!req.body.name) return res.status(400).json({error: 'Please enter a name for this plant'})
  if (!req.body.sunlight) return res.status(400).json({error: 'Please let us know how much sunlight this plant requires.'})
  if (!req.body.water) return res.status(400).json({error: 'Please let us know how much water this plant requires.'})

  try {
    // req.body.user = req.user._id;
    // req.body.user.firstName = req.user.firstName
    console.log('hi')
  
    const newPlant = await db.Plant.create(req.body);
    if (!newPlant) return res.status(404).json({error: 'Plant could not be created'});
    return res.json(newPlant);
  } catch (err) {
    return res.status(500).json('error on create')
  };
};

// Tested but will need user auth. Protect the route so only authorized users can update the plant
const update = async (req, res) => {
  try {
    const updatedPlant = await db.Plant.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (!updatedPlant) return res.status(404).json({error: 'Plant with this ID could not be found, or you are not authorized to edit this plant.' });
    return res.json(updatedPlant)
  } catch (err) {
    return res.status(500).json(err)
  };
};


// Tested but will need user auth. Protect the route so only authorized users can delete the plant
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