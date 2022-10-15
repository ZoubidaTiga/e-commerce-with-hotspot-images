

const {verifyTokenUser} = require('../middleware/verify')
const express = require('express')
const User = require('../models/user')
const bcrypt=require('bcrypt')
const API = require('../controllers/userApi')
const router = new express.Router()
//create
router.post('/api/users/add',verifyTokenUser, API.createUser);
//update 
//router.put('/api/users/update/:id',verifyTokenAndAuthorizationU,API.UpdateUser)
router.put('/api/users/update/:id',API.UpdateUser)

router.put('/api/users/updateByAdmin/:id',API.UpdateUserByAdmin)

//my account
router.get('/api/users/me',verifyTokenUser, async (req, res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
    });

//delete
           //router.delete('/api/users/delete/:id',verifyTokenAdmin,API.DeleteUser)
router.delete('/api/users/delete/:id',API.DeleteUser)
//GET USER
           //router.get('/api/users/find/:id',verifyTokenAdmin,API.fetchUserById)
router.get('/api/users/find/:id',API.fetchUserById)
//Get all users
//router.get('/api/users/',verifyTokenAdmin, API.fetchAllUsers)
router.get('/api/users/', API.fetchAllUsers)
module.exports = router
