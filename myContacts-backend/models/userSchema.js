const mongoose = require("mongoose")
const schemaUser = mongoose.Schema({
userName: {
    type: String,
    require: [true, "Enter user name.."],
  },
  email:{
    type:String,
    require:[true, "Enter email ID.."]
  },
  passwd:{
    type:String,
    require:[true, "Enter password.."]
  }
},
{
    timestamps: true
});
module.exports = mongoose.model("user",schemaUser)
