const express = require('express');
const storage = require("../../config/cloudinary");
const isLogin = require("../../middlewares/isLogin");
const multer = require("multer")
const {userRegister,userLogin,userProfile,userRetrive, updateUser,userDelete, profilePhotoUpload} = require ("../../controllers/users/usercrtl");

const usersRouter = express.Router();

// instance of multer
const upload = multer ({storage});
usersRouter.post("/register", userRegister);
        
usersRouter.post("/login", userLogin);
usersRouter.get("/profile/:id", userProfile);

usersRouter.get("/", userRetrive);

usersRouter.put("/:userId", updateUser);
usersRouter.delete("/:userId", userDelete);
usersRouter.post("/profile-photo-upload",upload.single("profile"), profilePhotoUpload);




   
module.exports = usersRouter;