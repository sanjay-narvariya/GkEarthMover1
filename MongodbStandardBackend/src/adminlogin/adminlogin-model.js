const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase:true,
        default: ""
    },
    email: {
        type:String,
        required:true,
        lowercase:true,
        unique: true,
        default: ""
    },
    phone: {
        type: String,
        trim: true,
        default: "",
    },
    password: {
        type: String,
        trim: true,
        required:true,
        default: ""
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

// Middleware to update the `updated_at` field before saving
adminSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
