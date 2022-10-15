const Collection = require('../models/collection');
const Product = require("../models/product");
const fs = require('fs')
module.exports= class API{

    //Fetch products 
    static async fetchAllCollections(req,res){
        try{
        const collection = await Collection.find();
        res.status(200).json(collection)
        }catch(err){
            res.status(404).json({message : err.message})
        }
    }
    static async fetchCollectionById(req,res){
     try{
       const collection = await Collection.findById(req.params.id)
       res.status(200).send(collection)
       
      }
       catch(err){
        res.status(404).send('error....')
       }
    }
    static async createCollection(req,res){
     
        req.body.image = req.file.path  
        let newCollection = new Collection();
        let tags = JSON.parse(req.body.tags)
        console.log(tags)
        req.body.tags=tags
        newCollection=req.body
        for (let i=0;i<newCollection.tags.length;i++){
            const productId = newCollection.tags[i].productId;
            console.log("productId",newCollection.tags[i].productId)
            const product= await Product.findById(productId);
            newCollection.tags[i].Prix=product.Price;
            newCollection.tags[i].image=product.image;
            newCollection.tags[i].title = product.title;
            newCollection.tags[i].Description=product.Description;
            newCollection.tags[i].x = req.body.tags[i].x;
            newCollection.tags[i].y = req.body.tags[i].y;
             
        } console.log(newCollection)
        try{
            await Collection.create(newCollection)
            res.status(200).send({message :'Collection created successfully '})
           
        }catch(err){
            res.status(404).send({message: err.message})
            
        } 
       
    }
    static async DeleteCollection(req,res){
       try{
                await Collection.findByIdAndDelete(req.params.id)
           res.status(200).json({ message: 'Collection deleted successfully....' })
            }catch(err){
                res.status(500).json();
            }
    }

    static async UpdateCollection(req, res) {
      
        let tags = JSON.parse(req.body.tags)
         //console.log('tywryetwr hhhhhhhhhhhh',tags[i])
        //console.log(req.body.tags)
        for (let i=0;i<tags.length;i++){
            const productId = tags[i].productId;
            console.log("productId",tags[i].productId)
            const product= await Product.findById(productId);
            tags[i].Prix=product.Price;
            tags[i].image=product.image;
            tags[i].title = product.title;
            tags[i].Description=product.Description;
             
        } 
        req.body.tags = tags
        console.log('new tags ', req.body.tags)
            try{
                const updatedCollection= await Collection.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set:req.body,
                    },{new :true}
                );
                res.status(200).send({message :'Collection updated successfully '})
                
            }catch(err){
                res.status(500).json("problem quelque part");
            }
    }
    static async getByProduct(req, res) {
        try {
            console.log('111',req.params.productId)
            const collection = await Collection.find({ "tags.productId": req.params.productId });
            console.log(collection.length)
            res.status(200).json(collection);
            }catch(err){
                res.status(500).json();
            }
    }

    
  
  


};