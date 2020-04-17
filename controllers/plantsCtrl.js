const db = require('../models');

// SHOW ALL PLANTS WITH NO OWNER (LIST OF DONATED PLANTS)
const index = async (req, res) => {
  try {
    const plants = await db.Plant.find()
    if (!plants) return res.status(404).json({error: 'Cannot get plants'})
    return res.json(plants);
  } catch (err) {
    return res.status(500).json('error on index')
  };
};

// SHOW USER'S PLANTS
const indexUser = async (req, res) => {
  try {
    const plants = await db.Plant.find({ user: req.user._id })
    if (!plants) return res.status(404).json({error: 'Cannot get plants'})
    return res.json(plants)
  } catch (err) {
    return res.status(500)
  }
}

const show = async (req, res) => {
  try {
    const plant = await db.Plant.findOne({ _id: req.params.id})
    .populate('user', 'firstName lastName _id')
    .exec()
    if (!plant) return res.status(404).json({error: 'Can"t find plant with this ID.'});
    return res.json(plant)
  } catch (err) {
    return res.status(500).json('error on show')
  }  
}


const create = async (req, res) => {
  try {
    const newPlant = {
      name: req.body.name,
      sunlight: req.body.sunlight,
      water: req.body.water,
      user: req.user._id
    }
    await db.Plant.create(newPlant);
    if (!newPlant) return res.status(404).json({error: 'Plant could not be created'});
    return res.json(newPlant);
  } catch (err) {
    return res.status(500).json('error on create')
  };
};


const update = async (req, res) => {
  try {
    const updatedPlant = await db.Plant.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (!updatedPlant) return res.status(404).json({error: 'Plant with this ID could not be found, or you are not authorized to edit this plant.' });
    return res.json(updatedPlant)
  } catch (err) {
    return res.status(500).json(err)
  };
};


const destroy = async (req, res) => {
  try {
      const deletedPlant = await db.Plant.findOneAndDelete({ _id: req.params.id });
      if (!deletedPlant) return res.status(404).json({error: 'Plant with that ID could not be found, or you are not authorized to delete this plant'});
      return res.json(deletedPlant);
  }   catch (err) {
      return res.status(500).json(err);
  };
};

const donate = async (req, res) => {
  try {
    const donatedPlant = {
      name: req.body.name,
      sunlight: req.body.sunlight,
      water: req.body.water,
      user: null
    }
    await db.Plant.findByIdAndUpdate({ _id: req.params.id }, donatedPlant , { new: true });
    if (!donatedPlant) return res.status(404).json({error: 'Plant could not be donated'});
    return res.json(donatedPlant);

  } catch (err) {
    return res.status(500).json(err);
  }; 
}

// const adopt = async (req, res) => {
//   try {
//     const adoptee = await db.User.findOne({ })
//     const adoptedPlant = await db.Plant.findByIdAndUpdate({ _id: req.params.id }, { user: req.body.user}, { new: true});

//   } catch (err) {
//     return res.status(500).json(err);
//   }
// }

module.exports = {
  index,
  indexUser,
  show,
  create,
  update,
  destroy,
  donate
}