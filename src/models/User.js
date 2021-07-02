import mongoose from 'mongoose'
const bcrypt = require('bcryptjs');

const UserSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    cpf: {
        type: String,
        lowercase: true
    },
    phone: {
        type: String,
        lowercase: true
    },
    birthday: {
        type: String,
        lowercase: true
    },
    imgeURL: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        select: false
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
 

