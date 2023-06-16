const express = require('express');
const isLogin = require("../../middlewares/isLogin");

const {userRegister,userLogin,userProfile,userRetrive, updateUser,userDelete} = require ("../../controllers/users/usercrtl");

const usersRouter = express.Router();

usersRouter.post("/register", userRegister);
        
usersRouter.post("/login", userLogin);
usersRouter.get("/profile/:id", userProfile);

usersRouter.get("/", userRetrive);

usersRouter.put("/:userId", updateUser);
usersRouter.delete("/:userId", userDelete);




   
module.exports = usersRouter;