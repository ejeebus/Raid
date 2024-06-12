const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');

router.post('/register', async (req, res) => {
    try {
        await registerUser(req, res);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    try {
        await loginUser(req, res);
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).send('Server error');
    }
});

router.get('/profile', async (req, res) => {
    try {
        await getUserProfile(req, res);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
