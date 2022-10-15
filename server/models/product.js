const mongoose = require('mongoose');
const {mediaSchema}=require('./media')
const slug = require('mongoose-slug-updater')


mongoose.plugin(slug)

const productSchema = mongoose.Schema({

    title: String,
   // slug1 :slugify(title),
    
    slug:{
        type:String,
        unique:true,
        slug:"title",
    },
    
    Quantity : Number,
   // image: { data: Buffer, contentType: String },
  
    category: String,
    Price: Number,
    Description: String,
    image: { 
        //type: mediaSchema,  
        type:String,
        required: true
      },

});
module.exports = mongoose.model('Product', productSchema)