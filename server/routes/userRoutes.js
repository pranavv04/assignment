const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data);
        const response = await newUser.save();
        console.log('User added');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password }); // Direct string comparison
        if (!user) {
            return res.status(404).json({ error: "Invalid username or password" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const data = await User.find();
        console.log('User data fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user by username
router.get('/:name', async (req, res) => {
    try {
        const userName = req.params.name;
        if (userName) {
            const response = await User.findOne({ username: userName });
            if (!response) {
                return res.status(404).json({ error: 'User not found' });
            }
            console.log('User data fetched');
            res.status(200).json(response);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update user by ID
router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = { ...req.body };

        const response = await User.findByIdAndUpdate(userId, updatedUser, {
            new: true,
            runValidators: true,
        });

        if (!response) {
            return res.status(404).json({ error: 'Failed to update user data' });
        }

        console.log('User data updated');
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await User.findByIdAndDelete(userId);

        if (!response) {
            return res.status(404).json({ error: 'Failed to delete data' });
        }
        console.log('User data deleted');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
