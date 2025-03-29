const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the enquiry schema
const enquirySchema = new Schema(
    {
        name: {
            type: String,
            lowercase: true,
            required: [true, "Name is required"],
            trim: true,
        },
        phone: {
            type: String, // Changed from Number to String
            required: [true, "Phone number is required"],
            trim: true,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, "Email is required"],
        },
        address: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true } // This automatically creates 'createdAt' and 'updatedAt'
);

// Create the model
const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
