const express = require('express');
const {addCategory,categoryProfile,getCategory, updateCategory,categoryDelete} = require ("../../controllers/categories/category");

const categoriesRouter = express.Router();

categoriesRouter.post("/addcategory", addCategory);
categoriesRouter.get("/", getCategory);
categoriesRouter.get("/profile/:id",categoryProfile );
categoriesRouter.put("/:categoryId", updateCategory);
categoriesRouter.delete("/:categoryId", categoryDelete);

module.exports = categoriesRouter;