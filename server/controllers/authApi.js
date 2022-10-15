const User = require('../models/user');
const Customer = require('../models/customer');
const jwt = require('jsonwebtoken')
const express = require('express')
const bcrypt=require('bcrypt')

module.exports= class API{
    static async createCustomer(req,res){

        let customer = await Customer.findOne({ email: req.body.email }) ;
        console.log(customer)
        if(customer) return res.status(400).send('customer already registered');
        const newCustomer= new Customer(req.body);
    
        const salt=await bcrypt.genSalt(10);
        newCustomer.password=await bcrypt.hash(newCustomer.password,salt);
       try{
        const savedCustomer= await newCustomer.save();
        console.log(savedCustomer);
        res.status(200).json(savedCustomer);
       } catch(err){
           console.log(err);
           res.status(500).json(err);
       }

    }




    static async createUser(req,res){

            let user = await User.findOne({ email: req.body.email }) ;
            console.log(user)
            if(user) return res.status(400).send('User already registered');
            const newUser= new User(req.body);
        
            const salt=await bcrypt.genSalt(10);
            newUser.password=await bcrypt.hash(newUser.password,salt);
           try{
            const savedUser= await newUser.save();
            console.log(savedUser);
            res.status(200).json(savedUser);
           } catch(err){
               console.log(err);
               res.status(500).json(err);
           }

    }
   

    static async loginAd(req,res){
        console.log(req.body)
        try{
            let user = await User.findOne({ email: req.body.email }) ;
            if (!user) {
                console.log('Invalid email')
                return res.status(400).send('Invalid email or password');
            }
            
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                 console.log('Invalid password')
                return res.status(400).send('Invalid email or password');
            }
              console.log(""+process.env.JWT_SECRET)
              const accessToken= jwt.sign({
                  id: user.id,
                  isAdmin:user.isAdmin
              },process.env.JWT_SECRET,
              {expiresIn:"3d"});
          
              const {password, ...others}=user._doc;
              res.status(200).json({...others, accessToken});
             } catch(err){
                 console.log(err);
                 res.status(500).json(err);
        }
         
    }

    static async login(req,res){
   
       

        try{
            let customer = await Customer.findOne({ email: req.body.email }) ;
            if(!customer) return res.status(400).send('Invalid email or password');
          
            const validPassword = await bcrypt.compare(req.body.password, customer.password);
            if(!validPassword) return res.status(400).send('Invalid email or password');
              console.log(""+process.env.JWT_SECRET)
              const accessToken= jwt.sign({
                  id: customer.id
              },process.env.JWT_SECRET,
              {expiresIn:"3d"});
          
              const {password, ...others}=customer._doc;
              res.status(200).json({...others, accessToken});
             } catch(err){
                 console.log(err);
                 res.status(500).json(err);
             }
          
     
    }

   
};







