const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:true, limit: '50mb'}))
app.use(cors());
app.use(morgan('tiny'))

const userApi = require('./router/userRouter')
app.use('/user', userApi )

app.listen(3002, ()=>{
    console.log(`Server is running on ${process.env.PORT || 3002}`)
})

mongoose.connect('mongodb://127.0.0.1:27017/mydb')
.then(()=>{
    console.log('Mongodb connected successfully')
}).catch((err)=>{
    console.log(`It has some Connection ${err}`);
})
