const User = require('../models/User');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'Profile fetched successfully',
            user
        });

    } catch (error) {
        console.error('Get Profile Error:', error);

        res.status(500).json({
            message: 'Server error'
        });
    }
};


const updateProfile = async (req, res) => {
    try {
        const { name, phone, address } = req.body;

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        user.name = name || user.name;
        user.phone = phone || '';
        user.address = address || '';

        await user.save();

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }
        });

    } catch (error) {
        console.error('Update Profile Error:', error);

        res.status(500).json({
            message: 'Server error'
        });
    }
};


module.exports = {
    getProfile,
    updateProfile
};