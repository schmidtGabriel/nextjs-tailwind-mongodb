import jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from 'models/User';
import {NextApiRequest, NextApiResponse} from 'next';
import dbConnect from 'utils/mongodb';

dbConnect();

async function generateToken(params){

    const token =  jwt.sign({params}, process.env.SECRET_KEY)
    return token
 }

export default async function(req: NextApiRequest, res: NextApiResponse){


    if(!req.body){
        res.statusCode = 404
        res.end('Error')
    }

    const {email, password} = req.body

    try{
        const user = await User.findOne({email}).select('+password')

        if(!user){
            res.status(400).json({success: false, msg: 'User not found'})
        }

        if(!await bcrypt.compare(password, user.password))
        return res.status(400).json({success: false, msg: 'Invalid password'})

        user.password = undefined
        user.confirmPassword = undefined

        const token = await generateToken({id: user._id})

        res.status(200).json({success: true, data: user, token: token})
    }catch(error){
        res.status(400).json({success: false, msg: error})
    }
    
}
