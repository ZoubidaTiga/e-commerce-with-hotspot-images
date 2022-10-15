const path = require('path')
const fs = require('fs')

const multer = require('multer')


let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        fs.mkdir('./uploads/',(err)=>{
           cb(null, './uploads/');
        });
      },
    filename :(req,file,callback)=>{
        callback(null,file.originalname);
    },
});


var upload = multer({
    storage : storage});

module.exports = upload