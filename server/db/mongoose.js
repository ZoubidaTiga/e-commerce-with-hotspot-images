const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/Ecom')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

/*
mongoose.connect(String(process.env.MONGODB_URL), {
useNewUrlParser: true,
})
*/
