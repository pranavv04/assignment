const express = require('express')
const router = express.Router();
const User = require('../models/User');
// const {jwtAuthMiddleware , generateToken } = require('')

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newUser = User(data)
        const response = await newUser.save();
        console.log('User added')
        res.status(200).json(response);


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username })
        if (!user || !(await user.comparePassword(password))) {
            return res.status(404).json({ error: "Invalid username or password" })
        }

        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


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

router.get('/:name' , async(req,res)=>{
    try {
        const userName = req.params.name;
        if(userName){
           const response = await User.findOne({username:userName});

           if(response.length===0){
            return res.status(404).json({error:'User not found'})
           }
           console.log('User data fetched')
           res.status(200).json(response)
        }

    } catch (error) {
        console.log(error);
    res.status(500).json({ message: 'Internal server error' });
    }
})

const bcrypt = require('bcryptjs');

router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = { ...req.body };

    // Check if a new password is provided
    if (updatedUser.password) {
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      updatedUser.password = await bcrypt.hash(updatedUser.password, salt);
    } else {
      // Remove password from the update if it's empty or not provided
      delete updatedUser.password;
    }

    // Perform the update with the hashed password if present
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




router.delete('/:id' , async(req,res)=>{
    try {
        const userId = req.params.id;
        const response = await User.findByIdAndDelete(userId);

        if(!response){
            return res.status(404).json({error: 'Failed to delete data'})
        }
        console.log('User data deleted')
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}) 

module.exports = router;