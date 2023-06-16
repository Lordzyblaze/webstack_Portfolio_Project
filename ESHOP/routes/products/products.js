const express = require('express');
const {addProduct,getProduct,productProfile,productDelete } = require ("../../controllers/products/productctrl");

const productsRouter = express.Router();

productsRouter.post("/addproduct", addProduct);

productsRouter.get("/", getProduct);
    
productsRouter.get("/profile/:id", productProfile);
productsRouter.delete("/:productId", productDelete);



    
   module.exports = productsRouter;