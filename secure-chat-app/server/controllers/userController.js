const User = require('../models/User');
const { generateIdentifier } = require('../utils/identifier');

exports.registerUser = async (req, res) => {
    try {
        let identifier = generateIdentifier();
        let user = new User({ identifier });
        await user.save();
        res.status(201).json({ identifier: user.identifier });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
