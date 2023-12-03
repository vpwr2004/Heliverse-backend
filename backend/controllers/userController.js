// controllers/userController.js
const User = require('../models/User');

// Create a new user

exports.createUser = async (req, res) => {
  try {
    const user=req.body;
    console.log('object backend',user);
    
    if(user.availability==="Yes")
      user.availability=true;
    else
      user.availability=false;
    const newUser = new User(user);
    await newUser.save();
    
    console.log('new user data',newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users with pagination
exports.getAllUsers = async (req, res) => {
  try {
    const page = req.query.page;
    const perPage = 20;
    const totalPage= await User.countDocuments();
    if(page<=0)
      page=1;
    else if(page>totalPage)
      page=totalPage;
    console.log('Page',page);
    const users = await User.find()
      .skip((page - 1) * perPage)
      .limit(perPage);
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};




// Filter users
exports.filterUsers = async (req, res) => {
    try {

      const { domain, gender, availability } = req.query;
      // console.log('object')
      const filter = {};
      if (domain) filter.domain = domain;
      if (gender) filter.gender = gender;
      if (availability=='Yes') filter.availability = true;
      console.log('filters',filter);

      const users = await User.find(filter);
      // console.log('create users', users);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Server side error' });
    }
  };
  
  // Search users by name
  exports.searchUsers = async (req, res) => {
    try {
      const { name } = req.query;
      const users = await User.find({ name: { $regex: new RegExp(name, 'i') } });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  