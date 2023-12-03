// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const {createUser,getAllUsers,getUserById,updateUser,deleteUser} =require('../controllers/userController');
// const {filterUsers,searchUsers}=require('../controllers/teamController');

router.post('/api/users', userController.createUser);
router.get('/api/users', userController.getAllUsers);
router.get('/api/users/:id', userController.getUserById);
router.put('/api/users/:id', userController.updateUser);
router.delete('/api/users/:id', userController.deleteUser);

router.get('/api/filter', userController.filterUsers);
router.get('/api/search', userController.searchUsers);

module.exports=router;
