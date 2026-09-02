const Image = require('../models/Image');
const cloudinary = require('../config/cloudinary');


const uploadImages = async (req, res) => {

    try {

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: 'Please select at least one image'
            });
        }

        const images = [];

        for (const file of req.files) {

            const result = await new Promise((resolve, reject) => {

                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: `image-upload/users/${req.userId}`,
                        resource_type: 'image'
                    },
                    (error, result) => {

                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }

                    }
                );

                uploadStream.end(file.buffer);
            });

            const image = await Image.create({
                userId: req.userId,
                originalName: file.originalname,
                fileName: result.public_id,
                filePath: result.secure_url
            });

            images.push(image);
        }

        res.status(201).json({
            message: 'Images uploaded successfully',
            images: images
        });

    } catch (error) {

        console.error('Cloudinary Upload Error:', error);

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