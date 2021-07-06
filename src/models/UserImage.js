import mongoose from 'mongoose'

const UserImageSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size:{
        type: Number,
    },
    url: {
        type: String,
        required: true
    },
    key:{
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserImageSchema.pre('save', async function(next) {
    if(!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }

    next();
})


export default mongoose.models.UserImage || mongoose.model('UserImage', UserImageSchema)
 

