
const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
    image: { 
        //type: mediaSchema,  
        type:String,
        //required: true
      },
}, {
    timestamps: true
})


const Media = mongoose.model('Media', mediaSchema)

module.exports = Media
