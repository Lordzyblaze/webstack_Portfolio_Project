const express = require('express');
const {addProduct,getProduct,productProfile,productDelete } = require ("../../controllers/products/productctrl");
const isLogin = require("../../middlewares/isLogin");
const productsRouter = express.Router();

productsRouter.post("/addproduct", isLogin, addProduct);

productsRouter.get("/", isLogin, getProduct);
    
productsRouter.get("/profile/:id", productProfile);
productsRouter.delete("/:productId", productDelete);



    
   module.exports = productsRouter;