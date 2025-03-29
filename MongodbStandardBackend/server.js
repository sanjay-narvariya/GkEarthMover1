require("dotenv").config();
const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const path = require("path");
const app = express();
const socketIo = require('socket.io');


// built-in middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/", express.static(path.join(__dirname, "/uploads/images")));


const connectDatabase = require("./db/database");

//import routes
const categoryRoutes = require("./src/category/category-routes");
 const subcategoryRoutes = require("./src/subcategory/subcategory-routes");
 const enquiryRoutes= require("./src/enquiry/enquiry-routes");
// const adminloginRoutes = require("./src/adminlogin/adminlogin-routes");




 //make routing
app.use("/category", categoryRoutes);
app.use("/subcategory", subcategoryRoutes);
app.use("/enquiry", enquiryRoutes);
// app.use("/adminlogin", adminloginRoutes);


//connect db
connectDatabase();

//create server//
const server = app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});



module.exports = app;