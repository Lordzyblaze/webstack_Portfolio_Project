const express = require('express');
const {addProduct,getProduct,productProfile,productDelete,uploadOptions } = require ("../../controllers/products/productctrl");
const isLogin = require("../../middlewares/isLogin");
const productsRouter = express.Router();

const multer = require('multer');

const FILE_TYPE_MAP = {
   'image/png': 'png',
   'image/jpeg': 'jpeg',
   'image/jpg': 'jpg'
 }
 const storage = multer.diskStorage({
   destination: function (req, file, cb) {
       const isValid = FILE_TYPE_MAP[file.mimetype];
       let uploadError = new Error('invalid image type');
 
       if(isValid) {
           uploadError = null
       }
     cb(uploadError, 'public/uploads')
   },
   filename: function (req, file, cb) {
       
     const fileName = file.originalname.split(' ').join('-');
     const extension = FILE_TYPE_MAP[file.mimetype];
     cb(null, `${fileName}-${Date.now()}.${extension}`)
   }
 });
 
 const upload = multer({ storage: storage })
   

productsRouter.post("/addproduct",upload.single('image'), isLogin, addProduct);

productsRouter.get("/", isLogin, getProduct);
    
productsRouter.get("/profile/:id", productProfile);
productsRouter.delete("/:productId", productDelete);
productsRouter.post(`/`, upload.single('image'), async (req, res) =>{
   const file = req.file;
   if(!file) return res.status(400).send('No image in the request')

   const fileName = file.filename
   const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
   let product = new product({
       name: req.body.name,
       image: `${basePath}${fileName}`,// "http://localhost:3000/public/upload/image-2323232"
    })
    product = await product.save();

    if(!product) 
    return res.status(500).send('The product cannot be created')

    res.send(product);
})

    
   module.exports = productsRouter;