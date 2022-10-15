const Media = require('../models/media');
const fs = require('fs')

module.exports= class API{

   
    static async createMedia(req,res){
     
        req.body.image = req.file.path  

        
        let newNedia = await  Media.findOne({ image: req.body.image })
        if (newNedia) {
            res.status(201).send(newNedia)
        }
        else {
            newNedia=req.body
            try{
                await Media.create(newNedia)
                res.status(201).send(newNedia)
            
            }catch(err){
                res.status(404).send({message: err.message})
            } 
        }
       
       
    }

};