const category = require("../../model/category/category");

const addCategory = async (req, res) => {
    const {name, icon, color} = req.body;
    try {
        //Check if Category name exist
        const categoryFound = await category.findOne({name });
        if(categoryFound) {
            return res.json({
                msg: 'Category Already Exist'
            });
        }  
    
   //create Category
   const newCategory = await category.create({
    name,
    icon,
    color,
});
res.json({    
    Status: 'Succes',
    Data: newCategory,
});

}
    catch (error) {
    res.json(error.message);
}    

};
 
//profile

const categoryProfile = async (req, res) => {
    const {id} = req.params;
        try {
        const profilecategory = await category.findById(id);
        res.json({
          status: "success",
          data: profilecategory,
        });
      } catch (error) {
        res.json(error.message);
      }
    };

    //all
const getCategory = async (req, res, next) => {
    try {
      const getcategory = await category.find();
      res.json({
        status: "success",
        data: getcategory,
      });
    } catch (error) {
      next(appErr(error.message));
    }
};

// Update Category
const updateCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const { name, icon, color } = req.body;

  try {
    // Check if name is already taken 
    if (name) {
      const nameTaken = await category.findOne({name});
      if (nameTaken && nameTaken._id.toString() !== categoryId) {
        return res.status(400).json({
          status: 'error',
          message: 'Category name is already taken',
        });
      }
    }

    // Find the category to update
    const categoryToUpdate = await category.findById(categoryId);

    if (!categoryToUpdate) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found',
      });
    }

    // Update category properties
    categoryToUpdate.name = name;
    categoryToUpdate.icon= icon;
    categoryToUpdate.color = color;

    // Save the updated save
    const updatedCategory = await categoryToUpdate.save();

    return res.json({
      status: 'success',
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while updating the category',
    });
  }
};

// Delete category by ID
const categoryDelete = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    // Find the CATEGORY to delete
    const categoryToDelete = await category.findByIdAndDelete(categoryId);

    if (!categoryToDelete) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found',
      });
    }

    return res.json({
      status: 'success',
      message: 'The category has been deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while deleting the category',
    });
  }
};

module.exports = {
    addCategory,
    categoryProfile, 
    getCategory,
    updateCategory,
    categoryDelete
  }