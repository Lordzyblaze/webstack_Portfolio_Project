const product = require("../../model/product/product");

const addProduct = async (req, res) => {
    const {name, image, price} = req.body;
    try {
        //Check if product name exist
        const productFound = await product.findOne({name });
        if(productFound) {
            return res.json({
                msg: 'Product Already Exist'
            });
        }  
    
   //create Product
   const newProduct = await product.create({
    name,
    image,
    price,
});
res.json({    
    Status: 'Succes',
    Data: newProduct,
});

}
    catch (error) {
    res.json(error.message);
}    

};

   //all
const getProduct = async (req, res, next) => {
    try {
      const getproduct = await product.find();
      res.json({
        status: "success",
        data: getproduct,
      });
    } catch (error) {
      next(appErr(error.message));
    }
};

//profile

const productProfile = async (req, res) => {
    const {id} = req.params;
        try {
        const profileproduct = await product.findById(id);
        res.json({
          status: "success",
          data: profileproduct,
        });
      } catch (error) {
        res.json(error.message);
      }
    };
   
// Delete user 
const productDelete = async (req, res) => {
    const productId = req.params.productId;
  
    try {
      // Find the product to delete
      const productToDelete = await user.findByIdAndDelete(productId);
  
      if (!productToDelete) {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found',
        });
      }
  
      return res.json({
        status: 'success',
        message: 'Product has been deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'An error occurred while deleting the user',
      });
    }
  };


   module.exports = {
    addProduct,
    getProduct,
    productProfile,
    productDelete,
}