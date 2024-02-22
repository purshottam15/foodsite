require('dotenv').config();
const express=require('express');
const router=express.Router();
const mongooseConnect=require('./db');
const authUser=require('./Routes/Auth.js');
const food=require('./Routes/food.js');
const foodcart=require('./Routes/foodcart.js');
const Address=require('./Routes/Address.js');
const order=require('./Routes/order.js');
var cors = require('cors');


const app=express()

mongooseConnect();
const port=process.env.PORT;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())




app.use('/auth/',authUser)
app.use('/auth/',food)
app.use('/auth/',foodcart)
app.use('/auth/',Address)
app.use('/auth/',order)



app.listen(port,()=>{
    console.log("Server running on port: ",port)
})