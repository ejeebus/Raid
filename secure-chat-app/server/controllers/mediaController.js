const Media = require('../models/Media');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

exports.uploadMedia = [upload.single('media'), async (req, res) => {
    try {
        const media = new Media({
            userId: req.body.userId,
            mediaType: req.file.mimetype,
            mediaUrl: req.file.path,
        });
        await media.save();
        res.status(201).json(media);
    } catch (err) {
        console.error('Error uploading media:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}];
