import mongoose from 'mongoose'
const bcrypt = require('bcryptjs');

const UserSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    cpf: {
        type: String,
        lowercase: true,
        default: ''
    },
    phone: {
        type: String,
        lowercase: true,
        default: ''
    },
    birthday: {
        type: String,
        lowercase: true,
        default: ''
    },
    imageURL: {
        type: String,
        default: '',
    },
    imageId: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    roles: {
        type: Array,
        default: ['user']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function(next) {
    
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
 

