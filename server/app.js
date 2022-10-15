const dotenv = require('dotenv')
const multer=require('multer')
var bodyParser = require('body-parser');

dotenv.config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true }));
mongoose.connect('mongodb://localhost/Ecom')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));

app.use("",require("./routers/product"))
app.use("",require("./routers/order"))
app.use("",require("./routers/auth"))
app.use("",require("./routers/user"))
app.use("", require("./routers/customer"))
app.use("",require("./routers/collection"))
app.use("",require("./routers/media"))
app.use("",express.static('images'))

app.listen(port,()=>console.log("listning for port ",port))