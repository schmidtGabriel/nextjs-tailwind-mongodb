import mongoose from 'mongoose'
import Product from "./Product";

const ProductImageSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
    },
    url: {
        type: String,
    },
    isMain: {
        type: Boolean,
        default: false
    },
    key: {
        type: String,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ProductImageSchema.pre('save', async function(next) {
    if(!this.url) {
        const env = process.env.NODE_ENV;
        if(env === "development"){
            this.url = `/pics/product/${this.name}`
        }else{

        }
    }

    next();
})


export default mongoose.models.ProductImage || mongoose.model('ProductImage', ProductImageSchema)
 

