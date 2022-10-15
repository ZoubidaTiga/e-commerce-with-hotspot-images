const{verifyTokenAdmin,
    verifyTokenCustomer,
    verifyTokenAndAuthorizationC} = require('../middleware/verify')
const express = require('express')
const Customer = require('../models/customer')
const bcrypt=require('bcrypt')
const API = require('../controllers/customerApi')
const router = new express.Router()

console.log(verifyTokenAndAuthorizationC)
//update 
          //router.put('/api/customers/update/:id',verifyTokenAndAuthorizationC,API.UpdateCustomer)
router.put('/api/customers/update/:id',API.UpdateCustomer)
//my account
router.get('/api/customers/me',verifyTokenCustomer, async (req, res)=>{
    const customer = await Customer.findById(req.customer._id).select('-password');
    console.log(customer)
    res.send(customer);
    });
//delete
         //router.delete('/api/customers/delete/:id',verifyTokenAdmin,API.DeleteCustomer)
router.delete('/api/customers/delete/:id',API.DeleteCustomer)
//GET customer
router.get('/api/customers/find/:id',API.fetchCustomerById)

//Get all customers
          //router.get('/api/customers/',verifyTokenAdmin, API.fetchAllCustomers);
router.get('/api/customers/',API.fetchAllCustomers);
router.get('/api/customers/findone',API.fetchCustomer)
router.get('/api/customers/add',API.createCustomer)
module.exports = router
