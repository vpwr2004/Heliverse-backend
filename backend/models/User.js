// models/User.js

const mongoose = require('mongoose');




const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  gender: String,
  avatar:String,
  domain: String,
  availability:Boolean,
});




const User = mongoose.model('User', userSchema);


module.exports = User;
