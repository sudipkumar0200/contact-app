const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const Hash = require("bcrypt");

const registerUser = async (req, res) => {
  const { userName, email, passwd } = req.body;

  if (!userName || !email || !passwd) {
    res.status(400);
    throw new Error("Input fiels required to be filled..");
  }
  const userAvilable = await User.findOne({ email });
  if (userAvilable) {
    res.status(400);
    throw new Error("User already exist.");
  }
  const hashPass = await Hash.hash(passwd, 10);
  const user = User.create({
    userName,
    email,
    passwd: hashPass,
  });
  if (user) {
    res.status(200).json({
      msg: "User created...",
      userName,
      email,
    });
  } else {
    res.status(401);
    throw new Error("Something went wrong...");
  }
  console.log("Hashed passwd is " + hashPass);
};
const loginUser = async (req, res) => {
  const { email, passwd } = req.body;
  if (!email || !passwd) {
    res.status(401);
    throw new Error("fill all required fiels..");
  }
  const user = await User.findOne({ email });
  const passCompare = await Hash.compare(passwd, user.passwd);
  if (user && passCompare) {
    const acessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );
    res.status(201).json({ acessToken });
    // console.log(acessToken)
  }else{
    res.status(401);
    throw new Error("Eiter email or passwd is invalid..")
  }
};
const currentUser = async (req, res) => {
  res.json(req.user);
};
module.exports = { registerUser, loginUser, currentUser };
