const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Category = require("./category-model");
const sendResponse = require("../../middleware/response");
const ErrorHandler = require("../../utils/ErrorHandler");
const fs = require('fs');


exports.createCategory = catchAsyncErrors(async (req, res, next) => {
    try {
        // Check if categoryname is provided
        if (!req.body.categoryname) {
            return next(new ErrorHandler("Category name is required", 400));
        }
 
        // Check if file is uploaded
        if (!req.file) {
            return next(new ErrorHandler("Category image is required", 400));
        }

        // Check if category already exists
        const categoryData = await Category.findOne({ categoryname: req.body.categoryname });
        if (categoryData) {
            return next(new ErrorHandler("This category already exists", 400));
        }

        // Create the new category
        const newCategory = await Category.create({
            categoryname: req.body?.categoryname,
            details: req.body?.details,
            categoryimage: req.file?.filename
        });

        sendResponse(res, 200, "Category created successfully.", newCategory);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});



exports.getAllCategory = catchAsyncErrors(async (req, res, next) => {
    try {
        
        const categories = await Category.find(); // Simple fetch query

        if (categories.length === 0) {
            return next(new ErrorHandler("Category Not Exist", 400));
        }

        sendResponse(res, 200, "Category data fetched successfully.", {
            categories
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});



exports.getCategoryByID = catchAsyncErrors(async (req, res, next) => {
    try {
        const categoryID = req.params.id;

        const category = await Category.findById(categoryID);
        if (!category) {
            return next(new ErrorHandler("Category Not Exist", 400));
        }
        
        sendResponse(res, 200, "Category by id fetched successfully.", category);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})




// exports.updateServiceByID = catchAsyncErrors(async (req, res, next) => {
//     try {
//         const serviceID = req.params.id;

//         const serviceData = await Services.findById(serviceID);
//         if (!serviceData) {
//             return next(new ErrorHandler("Service Not Exist", 400));
//         }

//         const service = await Services.findByIdAndUpdate(serviceID, req.body, {
//             new: true,
//             runValidators: true,
//         })

//         sendResponse(res, 200, "Service Updated Successfully.", service);
//     } catch (error) {
//         return next(new ErrorHandler(error.message, 500));
//     }
// })


// Update an existing service
exports.updateCategoryByID = catchAsyncErrors(async (req, res, next) => {
    try {
        const categoryID = req.params.id;

        const categoryData = await Category.findById(categoryID);
        if (!categoryData) {
            return next(new ErrorHandler("This Category Not Exist", 400));
        }

        // Update the category
        const updatedCategory = await Category.findByIdAndUpdate( categoryID, req.body,{ new: true, runValidators: true } );

        sendResponse(res, 200, "Category Updated Successfully.", updatedCategory);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});



exports.updateCategoryWithPictureByID = catchAsyncErrors(async (req, res, next) => {
   
    try {
        const categoryID = req.params.id;

        const categoryData = await Category.findById(categoryID);

        if (!categoryData) {
            return next(new ErrorHandler("Category Not Exist", 400));
        }

        if (categoryData?.categoryimage) {
            fs.unlink(`uploads/images/${categoryData?.categoryimage}`, async (error) => {

    if (error) {
                    if (error?.code === "ENOENT") {
                        const category = await Category.findByIdAndUpdate(categoryID, { ...req.body, categoryimage: req.file?.filename },{
                            new: true,
                            runValidators: true,
                        })
                        sendResponse(res, 200, "Category Updated successfully", category);
                    }
                    else {
                        return next(new ErrorHandler(error.message, 500));
                    }
                }
                else {
                    const category = await Category.findByIdAndUpdate(categoryID, { ...req.body, categoryimage: req.file?.filename },{
                        new: true,
                        runValidators: true,
                    })
                    sendResponse(res, 200, "Category Updated successfully", category);
                }
            });
        } else {
            return next(new ErrorHandler("Old Profile Picture Not Found", 400));
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})




exports.deleteCategoryByID = catchAsyncErrors(async (req, res, next) => {
    try {
        const categoryID = req.params.id;
        const categoryData = await Category.findById(categoryID);

        if (!categoryData) {
            return next(new ErrorHandler("Category Not Exist", 400));
        }

        // Delete the category first
        const deletedCategory = await Category.deleteOne({ _id: categoryID });

        // If an image exists, attempt to delete it
        if (categoryData.categoryimage) {
            fs.unlink(`uploads/images/${categoryData.categoryimage}`, (error) => {
                if (error) {
                    console.error("Image deletion failed:", error.message);
                }
            });
        }

        sendResponse(res, 200, "Category deleted successfully", deletedCategory);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


/*******************************************END********************************* */

