const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        const userFolder = path.join(
            __dirname,
            '..',
            'uploads',
            req.userId.toString()
        );

        
        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, {
                recursive: true
            });
        }

        cb(null, userFolder);
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            '-' +
            file.originalname.replace(/\s+/g, '-');

        cb(null, uniqueName);
    }
});


const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


module.exports = upload;