const Product = require('../models/product');
const { post } = require('../routers/product');
module.exports= class API{

    //Fetch products 
    static async fetchAllProducts(req,res){
        try{
        const product = await Product.find();
        res.status(200).json(product)
        }catch(err){
            res.status(404).json({message : err.message})
        }

    }
    static async fetchProductById(req,res){
     try{
       const product = await Product.findById(req.params.id)
       res.status(200).json(product)
      }
       catch(err){
        res.status(404).send('error....')
       }
    }
    static async createProduct(req,res){

       console.log(req.body)

       const product =req.body;
       const image = req.file.filename;
       console.log(image)
        product.image=image  
        try{
            await Product.create(product)
            res.status(201).json({message : "Product created successfully "})
        }catch(err){
            res.status(404).json({message: err.message})
        }
        
    }
    static async DeleteProduct(req,res){
        const product = Product.findByIdAndDelete({_id : req.params.id})
        await Product.deleteOne(product)
        res.send("product deleted successfully")
    }

    static async UpdateProduct(req,res){
     const id= req.params.id;
     let new_image ="" ;
     
     if(req.file){
        new_image = req.file.filename;
    try{
         fs.unlinkSync("./uploads/"+req.body.old_image);
         
     }
     catch(err){
        console.log(err)
     }}
     else{
         new_image= req.body.old_image
     }
        const newProduct =req.body;
        newProduct.image = new_image;
        try {
            await Product.findByIdAndUpdate(id, newProduct);
            res.status(200).json({message :'Product updated successfully '})
        }catch(err){
            res.status(400).json({message :err.message})
        }
    }

  
  


};