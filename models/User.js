const mongoose = require('mongoose');
const Plant = require('./Plant');


const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true
  }, 
  password: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  location: String,
});

// UserSchema.post('remove', function(deleletePlant) {
//   if (deletePlant) {
//     let result = Plant.deleteMany({
//       user: deleletePlant._id
//     })
//     console.log('deleted plant result', result)
//   } else {
//     console.log('this user has no plants')
//   }
// })

module.exports = mongoose.model('User', UserSchema);

