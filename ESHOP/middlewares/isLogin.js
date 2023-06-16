const getTokenFromHeader = require("../utils/gettokenfromheader");
const verifyToken = require("../utils/verifytoken");
const isLogin = (req, res, next) => {
  //get token from header
  const token = getTokenFromHeader(req);
  //verify the token
  const decodedUser = verifyToken(token);
  //save the user into req obj
  req.userAuth = decodedUser.id;
  if (!decodedUser) {
    return next(("Invalid/Expired token, please login again"));
  } else {
    next();
  }
};

module.exports = isLogin;