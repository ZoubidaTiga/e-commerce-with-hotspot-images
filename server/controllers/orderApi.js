
const Customer = require("../models/customer");
const Product = require("../models/product");
const Order =require("../models/order")
const customerApi = require("./customerApi")
module.exports= class API{

    //Fetch products 
    static async fetchAllOrders(req,res){
   
            try{
                const orders=await Order.find();
                res.status(200).json(orders)
            }catch(err){
                res.status(500).json();
            }
        }

    
    static async fetchOrderByIdCust(req,res){
            try{
                const order=await Order.find({customerId:req.params.customerId})
                res.status(200).json(order);
            }catch(err){
                res.status(500).json();
            }
    }

    static async fetchOrderById(req,res){
        try{
            const order=await Order.findById(req.params.id);
            //order.products
            console.log(order.products[0])
            let products=order.products;
            let amount=order.amount;
            

            res.status(200).json({products,amount});
        }catch(err){
            res.status(500).json();
        }
    }
    static async crOrder(req,res){
        let id_customer 
        let  customer
         try{
             customer=await Customer.findOne({name: req.body.name},{email: req.body.email})
             if (customer === null){
                 try{
                     let cust = await Customer.create(req.body)
                       id_customer =cust._id
                   }catch(err){
                       res.status(404).send({message: err.message})
                   } 
             }else {
                 id_customer= customer._id
             }
           }catch(err){
             res.status(404).send({message: err.message})
           } 

           const newOrder= new Order();
           newOrder.customerId =  id_customer
           newOrder.products = req.body.products
           newOrder.amount = req.body.amount
           newOrder.name = req.body.name
           newOrder.address = req.body.address
           let s=0;
           for (let i=0;i<newOrder.products.length;i++){
               let qty=newOrder.products[i].qty;
               newOrder.products[i].Quantity=newOrder.products[i].Quantity-qty;
               try{
                   await Product.findByIdAndUpdate(newOrder.products[i]._id, newOrder.products[i]);
                   console.log('Product updated successfully ')
               }catch(err){
                    res.status(400).send({message :err.message})
               }
           }
           try{
               const savedOrder= await newOrder.save();
               res.status(200).json(savedOrder);
           }
           catch(err){
               console.log(err)
               res.status(500).json(err)
           }
          
}
    static async createOrder(req,res){
           /*  let customer = await customerApi.fetchCustomer
            console.log(customer)
            if(customer){
              customer= customerApi.createCustomer
            }
           const newOrder= new Order(req.body);
            newOrder.customerId=customer._id
            newOrder.products=req.body.products
            newOrder.amount = req.body.total
            let s=0;
            for (let i=0;i<newOrder.products.length;i++){
                const productId=newOrder.products[i]._id;
                const product= await Product.findById(productId);
                newOrder.products[i].Price=product.Price;
                newOrder.products[i].title=product.title;
                s=s+product.Price*newOrder.products[i].qty;
                newOrder.amount=s;
                let qty=newOrder.products[i].qty;
                product.Quantity=product.Quantity-qty;
                try{
                    await Product.findByIdAndUpdate(productId, product);
                    console.log('Product updated successfully ')
                }catch(err){
                     res.status(400).send({message :err.message})
                }
            }
            try{
                const savedOrder= await newOrder.save();
                res.status(200).json(savedOrder);
            }
            catch(err){
                console.log(err)
                res.status(500).json(err)
            }




        /*
        const newOrder= new Order(req.body);
        const customer= await Customer.findById(newOrder.customerId);
        console.log('customer: '+customer);
        newOrder.name=customer.name;
        let s=0;
        for (let i=0;i<newOrder.products.length;i++){
            const productId=newOrder.products[i].productId;
            const product= await Product.findById(productId);
            newOrder.products[i].Price=product.Price;
            newOrder.products[i].title=product.title;
            s=s+product.Price*newOrder.products[i].qty;
            newOrder.amount=s;
            let qty=newOrder.products[i].qty;
            product.Quantity=product.Quantity-qty;
            try{
                await Product.findByIdAndUpdate(productId, product);
                console.log('Product updated successfully ')
            }catch(err){
                 res.status(400).send({message :err.message})
            }
        }
        try{
            const savedOrder= await newOrder.save();
            res.status(200).json(savedOrder);
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }*/
    }
    static async DeleteOrder(req,res){
            try{
                await Order.findByIdAndDelete(req.params.id)
                res.status(200).json({message:"Order has been deleted...."})
            }catch(err){
                res.status(500).json();
            }
    }

    static async UpdateOrder(req,res){
            try{
                const updatedOrder= await Order.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set:req.body,
                    },
                    {new :true}
                );
                res.status(200).json({message:"Order has been updated...."})
                
            }catch(err){
                res.status(500).json();
            }
    }
};
