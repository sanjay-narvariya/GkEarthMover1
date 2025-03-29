const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const sendResponse = require("../../middleware/response");
const ErrorHandler = require("../../utils/ErrorHandler");
const Subcategory = require("./subcategory-model");

const fs = require('fs');

 
exports.createSubcategory = catchAsyncErrors(async (req, res, next) => {
    try {
        // const subcategoryData = await Subcategory.findOne({ subcategoryname: req.body.subcategoryname });
        // if (subcategoryData) {
        //     return next(new ErrorHandler("This Subcategory Exist", 400));
        // }

        // Create the new subcategory
        const newSubcategory = await Subcategory.create({ ...req.body, subcategoryimage: req.file?.filename });
        // send response
        sendResponse(res, 200, "Sub Category Created Successfully", newSubcategory);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});




exports.getAllSubcategory = catchAsyncErrors(async (req, res, next) => {
    try {

        const subCategory = await Subcategory.find().populate("parent_category_id"); // Fetch all subcategory;
        if (subCategory.length === 0) {
            return next(new ErrorHandler("subCategory Not Exist", 400));
        }

        sendResponse(res, 200, "Sub Category Data Fetched Successfully", subCategory);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});






exports.getSubcategoryByID = catchAsyncErrors(async (req, res, next) => {
    try {
        const subCategoryID = req.params.id;


        const subCategory = await Subcategory.findById(subCategoryID)
         .populate("parent_category_id"); // Fetch all subcategory
      
        if (!subCategory) {  // यहाँ पर सही चेक किया गया है  
            return next(new ErrorHandler("SubCategory Not Exist", 404));
        }    
         
        sendResponse(res, 200, "Sub Category Data Fetched Successfully", subCategory);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});



// exports.updateSubServiceByID = catchAsyncErrors(async (req, res, next) => {
//     try {
//         const subServiceID = req.params.id;

//         const subServicesData = await SubService.findById(subServiceID);

//         if (!subServicesData) {
//             return next(new ErrorHandler("Sub Services not found!", 400));
//         }

//         const subService = await SubService.findByIdAndUpdate(subServiceID, req.body, {
//             new: true,
//             runValidators: true,
//         })

//         sendResponse(res, 200, "Sub Services Updated successfully", subService);
//     } catch (error) {
//         return next(new ErrorHandler(error.message, 500));
//     }
// });


exports.updateSubcategoryByID = catchAsyncErrors(async (req, res, next) => {
    try {
        const subCategoryID = req.params.id;

        const subCategoryData = await Subcategory.findById(subCategoryID);

        if (!subCategoryData) {
            return next(new ErrorHandler("Sub Category not found!", 400));
        }

        // Update the sub-category
        const subCategory = await Subcategory.findByIdAndUpdate(subCategoryID, req.body, { new: true, runValidators: true });


        sendResponse(res, 200, "Sub Category Updated successfully", subCategory);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});



exports.updateSubcategoryWithPictureByID = catchAsyncErrors(async (req, res, next) => {
    try {
        const subCategoryID = req.params.id;

        // 1️⃣ Subcategory को डेटाबेस से खोजें
        const subCategory = await Subcategory.findById(subCategoryID);

        if (!subCategory) {
            return next(new ErrorHandler("Sub Category not found!", 400));
        }

       
        // 3️⃣ पुरानी इमेज को डिलीट करें (अगर मौजूद है)
        if (subCategory.subcategoryimage) {
            try {
                await fs.promises.unlink(`uploads/images/${subCategory.subcategoryimage}`);
            } catch (error) {
                if (error.code !== "ENOENT") {
                    return next(new ErrorHandler(error.message, 500));
                }
            }
        }

        // 4️⃣ सबकैटेगरी अपडेट करें
        const updatedSubcategory = await Subcategory.findByIdAndUpdate(
            subCategoryID,
            { ...req.body, subcategoryimage: req.file?.filename },
            { new: true, runValidators: true }
        );

        // 5️⃣ सफलतापूर्वक प्रतिक्रिया भेजें
        sendResponse(res, 200, "Subcategory image updated successfully", updatedSubcategory);

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});




exports.deleteSubcategoryByID = catchAsyncErrors(async (req, res, next) => {
    try {
        const subCategoryID = req.params.id;
        const subCategory = await Subcategory.findById(subCategoryID);

        if (!subCategory) {
            return next(new ErrorHandler("Sub Category not found", 400));
        }


       
            // Delete the sub-category first
            const deletedSubCategory = await Subcategory.findOneAndDelete({ _id: subCategoryID });
      

         // 3️⃣ पुरानी इमेज को डिलीट करें (अगर मौजूद है)
         if (subCategory.subcategoryimage) {
            try {
                await fs.promises.unlink(`uploads/images/${subCategory.subcategoryimage}`);
            } catch (error) {
                if (error.code !== "ENOENT") {
                    return next(new ErrorHandler(error.message, 500));
                }
            }
        } 

     sendResponse(res, 200, "Sub Category deleted successfully", deletedSubCategory);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});





exports.getSubcategoryBycategoryID = catchAsyncErrors(async (req, res, next) => {
    try { 
        const categoryID = req.params.id;  

        // Find subcategories where parent_category_id matches categoryID
        const subCategory = await Subcategory.find({ parent_category_id: categoryID })
            .populate( "parent_category_id" ); // Populate only category name

        if (!subCategory || subCategory.length === 0) {
            return next(new ErrorHandler("No Subcategories found!", 404));
        }

        sendResponse(res, 200, "Sub Category Data Fetched Successfully", subCategory);

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


/***************************************end************************ */