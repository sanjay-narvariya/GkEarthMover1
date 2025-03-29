const express = require('express');
const router = express.Router();
const { createSubcategory, getAllSubcategory, getSubcategoryByID, getSubcategoryBycategoryID,getSubServicesForOnSite, deleteSubcategoryByID, getSubServicesSuggestion, updateSubcategoryByID, updateSubcategoryWithPictureByID, searchSubServices } = require("./subcategory-controller")



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



router.post("/subcategory-submit", upload.single("subcategoryimage"), createSubcategory);

router.get("/get-all-subcategory", getAllSubcategory);

router.get("/get-subcategory/:id", getSubcategoryByID);


router.post("/update-subcategory/:id", updateSubcategoryByID); // iski jaroorat nahi hai
router.post("/update-subcategory-with-picture/:id", upload.single("subcategoryimage"), updateSubcategoryWithPictureByID);


router.post("/delete-subcategory/:id", deleteSubcategoryByID);

router.get("/get_subcategory_by_categoryid/:id", getSubcategoryBycategoryID);










// router.get("/get-sub-services-for-onsite/:id", getSubServicesForOnSite);
// router.post("/search-sub-services/:term", searchSubServices);
// router.get("/get-sub-services-suggestion", getSubServicesSuggestion);

module.exports = router;