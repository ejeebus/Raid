const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  identifier: { type: String, unique: true, default: () => require('crypto').randomBytes(8).toString('hex') },
  displayName: String,
  status: String,
  profilePicture: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
