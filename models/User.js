const mongoose = require('mongoose');


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


module.exports = mongoose.model('User', UserSchema);

