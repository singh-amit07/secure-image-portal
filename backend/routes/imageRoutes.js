const express = require('express');

const {
    uploadImages,
    getMyImages
} = require('../controllers/imageController');

const authMiddleware = require('../middleware/authMiddleware');

const upload = require('../config/multer');

const router = express.Router();


router.post(
    '/upload',
    authMiddleware,
    upload.array('images', 10),
    uploadImages
);



router.get(
    '/my-images',
    authMiddleware,
    getMyImages
);


module.exports = router;