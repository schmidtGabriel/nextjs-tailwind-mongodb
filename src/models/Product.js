import mongoose from 'mongoose'
import ProductImage from "./ProductImage";
import Category from "./Category";

const ProductSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    formattedPrice: {
        type: String,
    },
    price: {
        type: Number,
    },
    inventory: {
        type: Number,
    },
    code: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true  
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductImage',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ProductSchema.pre('save', async function(next) {
    next();
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
 

