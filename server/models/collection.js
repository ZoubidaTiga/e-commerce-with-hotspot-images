
const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const Schema = mongoose.Schema;

mongoose.plugin(slug)
const collectionSchema = new mongoose.Schema({
    image: { 
        //type: mediaSchema,  
        type:String,
        //required: true
      },
    title: String,
    slug:{
        type:String,
        unique:true,
        slug:"title",
    },
    Description:String,
    tags:[
       {
           productId:
            {
                type:Schema.Types.ObjectId
            } ,
            Description:String,
            title: String,
            Prix: Number,
            image:String,
            x: Number,
            y:Number
        }
    ],
}, {
    timestamps: true
})


const Collection = mongoose.model('Collection', collectionSchema)

module.exports = Collection
