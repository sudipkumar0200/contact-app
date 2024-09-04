const express = require("express");
const { showContacts, showContact, addContact, updateContact, deleteContact } = require("../controller/contactController");
const validateToken = require("../middlewares/tokenMiddleware");
const router = express.Router();

router.use(validateToken)
router.route("/").get(showContacts);
router.route("/contact/:id").get(showContact)
router.route("/add").post(addContact)
router.route("/update/:id").put(updateContact);
router.route("/delete/:id").delete(deleteContact)
module.exports  = router; 