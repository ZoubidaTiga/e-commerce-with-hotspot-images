const User = require('../models/user');
const bcrypt=require('bcrypt')
module.exports= class API{

//create
    static async createUser(req, res) {
       const user =req.body
         try{
           await User.create(user)
             res.status(201).send({message : "admin created successfully "})
            
         }catch(err){
             res.status(404).send({message: err.message})
         } 
     }
    //Fetch Users 
    static async fetchAllUsers(req,res){
            try{
                const users=await User.find();
                res.status(200).json(users)
            }catch(err){
                res.status(500).json();
            }
    }


    static async fetchUserById(req,res){

            try{
                const user=await User.findById(req.params.id)
                const {password, ...others}=user._doc;
                res.status(200).json(others);
            }catch(err){
                res.status(500).json('error');
            }
    }

    static async DeleteUser(req,res){
            try{
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted....")
            }catch(err){
                res.status(500).json();
            }
    }


    static async UpdateUser(req, res) {
        console.log('update')
            if(req.body.passwordNew){
                try {
                    const user = await User.findById(req.params.id);
                    const validPassword = await bcrypt.compare(req.body.passwordOld, user.password);
                    if (validPassword) {
                        const salt = await bcrypt.genSalt(10);
                        req.body.password = await bcrypt.hash(req.body.passwordNew, salt);
                    }
                    else
                        return res.status(400).send('Invalid password');
                }catch(err){
                res.status(500).json({message: err.message});
            }
                
            }
            try{
                const updatedUser= await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set:req.body,
                    },{new :true}
                );
                res.status(200).json(updatedUser)
                
            }catch(err){
                res.status(500).json();
            }
        
    }

    static async UpdateUserByAdmin(req, res){ 
                    if(req.body.password){
                    
                            const salt=await bcrypt.genSalt(10);
                            req.body.password=await bcrypt.hash(req.body.password,salt);
                            
                        }
                    try{
                        const updatedUser= await User.findByIdAndUpdate(
                            req.params.id,
                            {
                                $set:req.body,
                            },{new :true}
                        );
                        res.status(200).json(updatedUser)
                        
                    }catch(err){
                        res.status(500).json();
                    }
    }

};







