const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Customer = require('../models/customer')
const express = require('express')
const bcrypt=require('bcrypt')
const API= require('../controllers/authApi')


const router = new express.Router()

//register User
router.post('/api/users/register',API.createUser);

//register customer
router.post('/api/customers/register',API.createCustomer);

//login Admin
router.post('/api/users/login',API.loginAd);

//login customer
router.post('/api/customers/login',API.login);

module.exports = router 