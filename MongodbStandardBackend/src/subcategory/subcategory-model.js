const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
    subcategoryname: {
        type: String,
        trim: true,
        default: "",
    },
    parent_category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Category ID is required"]
    },
    subcategoryimage: {
        type: String,
        trim: true,
        default: "",
    },
    details: {
        type: String,
        trim: false,
        default: "",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});

// Middleware to update the 'updated_at' field on update
SubcategorySchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});


// SubcategorySchema.post('findOneAndDelete', async function(doc) {
//     if (doc) {
//         await mongoose.model('Service').updateOne(
//             { _id: doc.parent_service_id },
//             { $pull: { sub_services: doc._id } }
//         );
//     }
// });

const Subcategory = mongoose.model('Subcategory', SubcategorySchema);

module.exports = Subcategory;