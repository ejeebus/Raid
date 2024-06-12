const GroupChat = require('../models/GroupChat');

exports.createGroupChat = async (req, res) => {
    const { groupName, members } = req.body;
    try {
        const groupChat = new GroupChat({ groupName, members });
        await groupChat.save();
        res.status(201).json({ message: 'Group chat created', groupChat });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.sendMessage = async (req, res) => {
    const { groupId, sender, content, media } = req.body;
    try {
        let groupChat = await GroupChat.findById(groupId);
        groupChat.messages.push({ sender, content, media });
        await groupChat.save();
        res.status(200).json({ message: 'Message sent', groupChat });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getGroupChats = async (req, res) => {
    try {
        const groupChats = await GroupChat.find({ members: req.user.userId }).populate('members', 'identifier');
        res.status(200).json(groupChats);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
