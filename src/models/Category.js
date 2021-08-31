import mongoose from 'mongoose'

const CategorySchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

CategorySchema.pre('save', async function(next) {
    next();
})

export default mongoose.models.Category || mongoose.model('Category', CategorySchema)
 

