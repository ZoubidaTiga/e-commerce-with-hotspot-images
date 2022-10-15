const Customer = require('../models/customer');
module.exports= class API{

    //Fetch customers 
    static async fetchAllCustomers(req,res){
            try{
                const customers=await Customer.find();
                /* const customerMap ={};
                customers.forEach((customer) => {
                    const {password,_id, ...others}=customer._doc; 
                    customerMap[customer._id] = others;
                }) 
                res.status(200).json(customerMap);*/
                res.status(200).json(customers)
            }catch(err){
                res.status(500).json();
            }
    }


    static async fetchCustomerById(req,res){

            try{
                const customer=await Customer.findById(req.params.id)
                const {password, ...others}=customer._doc;
                res.status(200).json(others);

            }catch(err){
                res.status(500).json('error');
            }
    }

    static async fetchCustomer(req,res){
      /*   customer.name=req.body.name;
        customer.email=req.body.email; */


        try{
            const customer=await Customer.findOne({name: req.body.name},{email: req.body.email})
            if(customer === null) return res.status(500).json('dont exist')
             res.status(200).json("customer name exist ");
        }catch(err){
            res.status(500).json('error');
        }
}

    static async DeleteCustomer(req,res){
            try{
                await Customer.findByIdAndDelete(req.params.id)
                res.status(200).json("customer has been deleted....")
            }catch(err){
                res.status(500).json();
            }
    }


    static async UpdateCustomer(req,res){
            if(req.body.password){
                const salt=await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(req.body.password,salt);
                
            }
            try{
                const updatedcustomer= await Customer.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set:req.body,
                    },{new :true}
                );
                res.status(200).json(updatedcustomer)
                
            }catch(err){
                res.status(500).json();
            }
        
    }

    static async createCustomer(req,res){
     

       const customer =req.body
 
         try{
           await Customer.create(customer)
             res.status(201).send({message : "Customer created successfully "})
            
         }catch(err){
             res.status(404).send({message: err.message})
         } 
        
     }

    
    


};







