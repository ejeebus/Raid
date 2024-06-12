const mongoose = require('mongoose');

const GroupChatSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    messages: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content: String,
        media: String,
        timestamp: {
            type: Date,
            default: Date.now,
        },
        reactions: [{
            type: String,
        }],
    }],
});

module.exports = mongoose.model('GroupChat', GroupChatSchema);
