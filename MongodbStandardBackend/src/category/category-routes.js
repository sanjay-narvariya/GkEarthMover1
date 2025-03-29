const express = require('express');
const router = express.Router()
const { createCategory, getAllCategory, getSearch, getRandomServices, getCategoryByID, deleteCategoryByID, updateCategoryByID, updateCategoryWithPictureByID, searchServices } = require("./category-controller");




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




router.post("/category-submit", upload.single("categoryimage"), createCategory );

router.get("/get-all-category", getAllCategory);

router.get("/get-category/:id", getCategoryByID);

router.post("/update-category-with-picture/:id", upload.single("categoryimage"), updateCategoryWithPictureByID);
router.post("/update-category/:id", updateCategoryByID); /// iski jarrorat nahi hain

router.post("/delete-category/:id", deleteCategoryByID);


 

// router.post("/search-services/:term", searchServices);

// router.get("/get-random-services", getRandomServices);

// router.post("/search", getSearch);

module.exports = router;