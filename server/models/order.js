
const mongoose = require('mongoose')
const Schema=mongoose.Schema;
const orderSchema = new mongoose.Schema({
    customerId:{type:Schema.Types.ObjectId, required:true},
    products:[
       {
           productId:
            {
                type:Schema.Types.ObjectId
            } ,
            qty:
            {
                type:Number , 
                default:1,
            },
            Price:Number,
            title: String
        }
    ],
    name:String,
    address: {type:Object},
    amount: {type:Number, required:true},
    status:{type:String, default:"pending"},
}, {
    timestamps: true
})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order
