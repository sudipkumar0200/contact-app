const express = require("express");
const { get } = require("./routes/contactRoutes");
const connectDb = require("./config/dbConnection");
const app = express();
app.use(express.json());
connectDb()

const dotenv = require("dotenv").config();

app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/user", require("./routes/userRoutes"))


const port = process.env.PORT || 3000;
app.listen(port,()=>{
console.log(`Server is running on port ${port}`)
})
