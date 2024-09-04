const express = require("express")
const { registerUser, loginUser, currentUser } = require("../controller/userController")
const router = express.Router()
const validateToken = require("../middlewares/tokenMiddleware")

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/current",validateToken, currentUser)
module.exports = router;