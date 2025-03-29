const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const Enquiry = require("./enquiry-model");
const sendResponse = require("../../middleware/response");
const ErrorHandler = require("../../utils/ErrorHandler");


exports.createEnquiry = catchAsyncErrors(async (req, res, next) => {
    try {

        // Create the new enquiry
        const newEnquiry = await Enquiry.create({
            name: req.body?.name,
            phone: req.body?.phone,
            email: req.body?.email,
            address: req.body?.address
        });

        sendResponse(res, 200, "Enquiry submitted successfully.", newEnquiry);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});



exports.getAllEnquiry = catchAsyncErrors(async (req, res, next) => {
    try {
        
        const enquiry = await Enquiry.find(); // Simple fetch query

        if (enquiry.length === 0) {
            return next(new ErrorHandler("Enquiry Not Exist", 400));
        }

        sendResponse(res, 200, "Enquiry data fetched successfully.", {
            enquiry
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});


