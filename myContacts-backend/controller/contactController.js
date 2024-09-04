const contact = require("../models/schema");

const showContacts = async (req, res) => {
  try {
    const contacts = await contact.find({ user_Id: req.user.id });
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
  }
};
///
const showContact = async (req, res) => {
  try {
    const contactByID = await contact.findById(req.params.id);
    res.status(201).json(contactByID);
  } catch (error) {
    console.log(error);
  }
};
//

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Input fields required to be filled!!!!");
  }
  const contactAdd = await contact.create({
    name,
    email,
    phone,
    user_Id: req.user.id,
  });
  res.status(200).json(contactAdd);
};
//

const updateContact = async (req, res) => {
  try {
    //const contactByID = await contact.findById(req.params.id);
    const updatedContact = await contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(201).json(updatedContact);
  } catch (error) {
    console.log(error);
  }
};
const deleteContact = async (req, res) => {
  const Contact = await contact.findById(req.params.id);
  await contact.deleteOne();
  res.status(200).json({
    msg: `Contact deleted for ${Contact._id}`,
  });
};

module.exports = {
  showContacts,
  showContact,
  addContact,
  updateContact,
  deleteContact,
};
