const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Customer = require('../models/customer')
const dotenv = require('dotenv')
dotenv.config()

//Users and Admin
const verifyTokenUser = async (req, res, next) => {
  const authHeader = req.headers.token;
  console.log("authHeader        ="+authHeader);
  if(authHeader){
    const token= authHeader.split(" ")[1];
    jwt.verify(token,process.env.JWT_SECRET ,async (err,user)=>{
        if(err) return res.status(403).json('Token is not valide')
        req.user= await User.findById(user.id);
        next();
    });
  }
  else{
    console.log('you are not authentificated')
    return res.status(401).json('you are not authentificated');
  }
  };



const verifyTokenAndAuthorizationU = async(req, res, next) => {
  verifyTokenUser(req,res,()=>{
    if(req.user.id===req.params.id || req.user.isAdmin  ) next()
    else{ 
      res.status(403).json('you are not alowed to that!')
    }
  });
  };


  const verifyTokenAdmin = async(req, res, next) => {
    verifyTokenUser(req,res,()=>{
      console.log("      "+req.user.isAdmin)
      if( req.user.isAdmin) next()
      else{
        res.status(403).json('you are not alowed to that!')
      }
    });
    };

//Customers
const verifyTokenCustomer = async (req, res, next) => {
  const authHeader = req.headers.token;
  if(authHeader){
    // const token= authHeader.split(" ")[1];
    jwt.verify(authHeader,process.env.JWT_SECRET ,async (err,customer)=>{
        if(err) return res.status(403).json('Token is not valide')
        req.customer= await Customer.findById(customer.id);
        next();
    });
  }
  else{
    return res.status(401).json('you are not authentificated');
  }
  };


const verifyTokenAndAuthorizationC = async(req, res, next) => {
  verifyTokenCustomer(req,res,()=>{
    console.log(req.customer.id)
    if(req.customer.id===req.params.id || req.customer.id===req.params.customerId) next()
    else{ 
      res.status(403).json('you are not alowed to that!')
    }
  });
  };


module.exports ={verifyTokenAndAuthorizationU,verifyTokenUser,verifyTokenAdmin,verifyTokenCustomer,verifyTokenAndAuthorizationC}
