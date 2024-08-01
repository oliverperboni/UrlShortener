const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longURL: { type: String, required: true },
  shortURL: { type: String, required: true },
  clicked: { type: Number, default: 0 },
}, { timestamps: true });




const userSchema = new mongoose.Schema({
  name: String,
  password: String,
}, { timestamps: true });

// Create and Export Models
const Url = mongoose.model('Url', urlSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Url, 
  User, 
};
