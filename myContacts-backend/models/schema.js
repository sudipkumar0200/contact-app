const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
  user_Id:{
    type:mongoose.Schema.ObjectId,
    require : true,
    ref:"User"

  },
  name: {
    type: String,
    require: [true, "Add your contact name..."],
  },
  email:{
    type:String,
    require:[true, "Add your email.."]
  },
  phone:{
    type:String,
    require:[true, "Add your phone number.."]
  }
},
{
    timestamps: true
});
module.exports = mongoose.model("contact", contactSchema)
