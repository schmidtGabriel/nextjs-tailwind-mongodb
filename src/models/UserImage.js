import mongoose from 'mongoose'
import User from "./User";

const UserImageSchema =  new mongoose.Schema({
    name: {
        type: String,
    },
    size:{
        type: Number,
    },
    url: {
        type: String,
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
        const env = process.env.NODE_ENV;
        if(env === "development"){
            this.url = `/pics/user/${this.name}`
        }else{

        }
    }

    next();
})


export default mongoose.models.UserImage || mongoose.model('UserImage', UserImageSchema)
 

