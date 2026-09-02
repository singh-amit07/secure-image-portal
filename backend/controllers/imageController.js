const Image = require('../models/Image');


const uploadImages = async (req, res) => {

    try {

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: 'Please select at least one image'
            });
        }

        const images = [];

        for (const file of req.files) {

            const image = await Image.create({
                userId: req.userId,
                originalName: file.originalname,
                fileName: file.filename,
                filePath: `uploads/${req.userId}/${file.filename}`
            });

            images.push(image);
        }

        res.status(201).json({
            message: 'Images uploaded successfully',
            images: images
        });

    } catch (error) {

        console.error('Upload Images Error:', error);

        res.status(500).json({
            message: 'Image upload failed'
        });
    }
};


const getMyImages = async (req, res) => {

    try {

        const images = await Image.find({
            userId: req.userId
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            message: 'Images fetched successfully',
            totalImages: images.length,
            images: images
        });

    } catch (error) {

        console.error('Get Images Error:', error);

        res.status(500).json({
            message: 'Unable to fetch images'
        });
    }
};


module.exports = {
    uploadImages,
    getMyImages
};