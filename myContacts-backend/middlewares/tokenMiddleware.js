const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler")
// const dotenv = require("dotenv")

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      token = authHeader.split(" ")[1];
      // token = JSON.stringify(token)
      // console.log(process.env.SECRET_TOKEN);
      // console.log(token)
      const decoded = await jwt.verify(token, process.env.SECRET_TOKEN);
      // console.log("hello from error")
      req.user = decoded.user;
      next();
    } catch (err) {
      console.log(err);
    }
  }
});
module.exports = validateToken;
