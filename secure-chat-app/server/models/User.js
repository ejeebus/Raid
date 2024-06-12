const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
        unique: true,
    },
    profilePicture: String,
    statusMessage: String,
    displayName: String,
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);
