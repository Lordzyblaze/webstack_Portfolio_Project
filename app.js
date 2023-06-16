const express = require('express');
require("dotenv").config();
require("./config/dbConnect");
const productsRouter = require('./routes/products/products');
const usersRouter = require('./routes/users/usersroutes');



const app = express();
const morgan = require('morgan');

require('dotenv/config');

const api = process.env.API_URL;


//middleware
app.use(express.json())// pass incoming payload
app.use(morgan('tiny'));

 
//Products routes
app.use("/api/v1/products", productsRouter);
//Users routes
app.use("/api/v1/users", usersRouter);
//Category routes


//Server
app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})