const bcrypt = require("bcryptjs");
const user = require("../../model/user/user");
const generateToken = require("../../utils/generatetoken");
const gettokenfromheader = require("../../utils/gettokenfromheader");


//Register
const userRegister = async (req, res) => {
    
    const {firstname, lastname, email, Password} = req.body;
    try {
        //Check if email exist
        const userFound = await user.findOne({email });
        if(userFound) {
            return res.json({
                msg: 'User Already Exist'
            })
        };
        //hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        //create user
        const newUser = await user.create({
            firstname,
            lastname,
            email,
            Password: hashedPassword, 
        });
        res.json({    
            Status: 'Succes',
            Data: newUser
});
        }
        catch (error) {
        res.json(error.message);
        }
   };

//Login
   const userLogin = async (req, res) => {
    const {email, Password} = req.body;
    try {
        //check if email exist
    const userFound = await user.findOne ({email });
    if (!userFound) {
      return res.json ({
        msg: "Invalid login Credentials",
        });
        
    }
    //validity of password
    const isPasswordMatched = await bcrypt.compare(
        Password,
        userFound.Password
      );
    
    if (!isPasswordMatched) {
        if (!userFound)
        return res.json ({
            msg: "Invalid login Credentials",
        });
    }
        res.json({    
            Status: 'Succes',
            Data: {
                firstname: userFound.firstname,
                lastname: userFound.lastname,
                email: userFound.email,
                isAdmin: userFound.isAdmin,
                token: generateToken(userFound._id),
            }
});
        }
        catch (error) {
        res.json(error.message);
        }
   }; 

//profile

const userProfile = async (req, res) => {
  const {id} = req.params;
      try {
      const profileuser = await user.findById(id);
      res.json({
        status: "success",
        data: profileuser,
      });
    } catch (error) {
      res.json(error.message);
    }
  };
//all
const userRetrive = async (req, res, next) => {
    try {
      const retriveuser = await user.find();
      res.json({
        status: "success",
        data: retriveuser,
      });
    } catch (error) {
      res.json(error.message);
    }
  };

 // Update user 
const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { email, firstname, lastname } = req.body;

  try {
    // Check if email is already taken by another user
    if (email) {
      const emailTaken = await user.findOne({ email });
      if (emailTaken && emailTaken._id.toString() !== userId) {
        return res.status(400).json({
          status: 'error',
          message: 'Email is already taken',
        });
      }
    }

    // Find the user to update
    const userToUpdate = await user.findById(userId);

    if (!userToUpdate) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // Update user properties
    userToUpdate.firstname = firstname;
    userToUpdate.lastname = lastname;
    userToUpdate.email = email;

    // Save the updated user
    const updatedUser = await userToUpdate.save();

    return res.json({
      status: 'success',
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while updating the user',
    });
  }
};

// Delete user 
const userDelete = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user to delete
    const userToDelete = await user.findByIdAndDelete(userId);

    if (!userToDelete) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    return res.json({
      status: 'success',
      message: 'Your account has been deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while deleting the user',
    });
  }
};

   
   module.exports = {
    userRegister,
    userLogin,
    userProfile,
    userRetrive,
    updateUser,
    userDelete,
};


