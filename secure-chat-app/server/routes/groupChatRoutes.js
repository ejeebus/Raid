const express = require('express');
const router = express.Router();
const { createGroupChat, sendMessage, getGroupChats } = require('../controllers/groupChatController');

router.post('/create', createGroupChat);
router.post('/send', sendMessage);
router.get('/', getGroupChats);

module.exports = router;
