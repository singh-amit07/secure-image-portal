const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();


const connectDB = require('./config/db');
const cloudinary = require('./config/cloudinary');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const imageRoutes = require('./routes/imageRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/images', imageRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running successfully!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});