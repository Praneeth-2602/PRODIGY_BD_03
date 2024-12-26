const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userModel'); // Assuming you have a Mongoose model defined

// Register user
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user', // Default to 'user' role if not provided
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // JWT token expires in 1 hour
        );

        res.json({ token });
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user profile (protected route)
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId); // Get user by ID from JWT payload
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
