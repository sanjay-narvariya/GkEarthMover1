const express = require('express');
const router = express.Router()
const { createEnquiry, getAllEnquiry } = require("./enquiry-controller");




var multer=require('multer')
const { v4: uuidv4 } = require('uuid');

const storage=multer.diskStorage({

   destination:(req,file,path)=>{

                 path(null,'uploads/images') 
               },

    filename:(req,file,path)=>{

               var ext=file.originalname.substring(file.originalname.lastIndexOf("."))
               var fn=`${uuidv4()}${ext}`
               path(null,fn) 
             }
   
})

var upload=multer({storage:storage})
module.exports=upload




router.post("/enquiry-submit", createEnquiry );

router.get("/get-all-enquiry", getAllEnquiry);

module.exports = router;