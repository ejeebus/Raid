const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/secure-chat-app';

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI); // Removed deprecated options
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
