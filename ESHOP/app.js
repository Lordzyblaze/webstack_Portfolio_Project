const express = require('express');
require("dotenv").config();
require("./config/dbConnect");
const productsRouter = require('./routes/products/products');
const usersRouter = require('./routes/users/usersroutes');
const categoriesRouter = require('./routes/categories/categories');
const globalErrHandler= require("./middlewares/globalErrHandler");
const router = require('./routes/orders/orders');


const app = express();
const morgan = require('morgan');

require('dotenv/config');

const api = process.env.API_URL;


//middleware
app.use(express.json())// pass incoming payload
app.use(morgan('tiny'));
app.use(globalErrHandler);

 
//Products routes
app.use("/api/v1/products", productsRouter);
//Users routes
app.use("/api/v1/users", usersRouter);
//Category routes
app.use("/api/v1/categories", categoriesRouter);
app.use(`${api}/orders`, router);


//Server
app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})