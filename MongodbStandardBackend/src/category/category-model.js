const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the service schema
const categorySchema = new Schema({
    categoryname: {
        type: String,
        // required:true,
        default: "",
    },  
    details: {
        type: String,
        // required: [true, "Category details are required"],  
        default: "",
    },
    categoryimage: {
        type: String,
        required:true,
        trim: true,
        default: "",
    },

    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware to update the updated_at field
categorySchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

// Create the model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;