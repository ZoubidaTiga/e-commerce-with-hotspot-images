const API = require ("../controllers/orderApi")
const {
    verifyTokenAndAuthorizationU,
    verifyTokenUser,
    verifyTokenAdmin
} = require('../middleware/verify')

const express = require('express')
const Order = require('../models/order')
const router = new express.Router()

//Create
router.post('/api/Orders/create/',API.createOrder);
//test customer
router.post('/api/Orders/crea/',API.crOrder);

//update 
router.put('/api/Orders/update/:id',verifyTokenUser, API.UpdateOrder);

//delete

router.delete('/api/Orders/delete/:id',verifyTokenUser,API.DeleteOrder)
//GET Order

router.get('/api/Orders/find/:customerId',verifyTokenAndAuthorizationU,API.fetchOrderByIdCust);

router.get('/api/Orders/findById/:id',verifyTokenUser,API.fetchOrderById);

//Get all orders
router.get('/api/Orders/',API.fetchAllOrders );


//Get monthly income
router.get('/api/orders/income',verifyTokenUser, async (req, res) => {
    const date= new Date();
    const lasMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lasMonth.getMonth()-1));
    try{
        const income=await Order.aggregate([
            {$match:{createdAt: { $gte: previousMonth}}},
               { $project:{
                    month:{ $month :"$createdAt"},
                    sales:"$amount"
                }},
                
                {
                    $group:{
                    _id:"$month",
                    total:{$sum:"$sales"}
                }
             
            },
        ]);
        res.status(200).json(income);
    }
    catch(err){
        res.status(500).json(err)
    }
});


module.exports = router 