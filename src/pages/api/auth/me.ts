import { jwt } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from 'models/User';
import {NextApiRequest, NextApiResponse} from 'next';
import dbConnect from 'utils/mongodb';

dbConnect();

async function generateToken(params){
    const token = await jwt.sign(params, process.env.SECRET_KEY,{
             expiresIn: 99999
         })

    return token
 }

 async function middlewareTokenVerify(authorization, req, res){

    if(!authorization)
    return res.status(401).json({success: false, msg: 'No token provider'})

    const parts = authorization.split(' ');
    if(parts.length !== 2)
    return res.status(401).json({success: false, msg: 'Token Error'})

    if(!/^DoNada$/i.test(parts[0]))
    return res.status(401).json({sucess: false, msg: 'Token bad formatted'})

    jwt.verify(parts[1], process.env.SECRET_KEY , (err, decoded) => {
        if(err) return res.status(401).json({success: false, msg: 'Token invalid'})
        req.userId = decoded.id;
        return true
    })

    return true

 }

export default async function(req: NextApiRequest, res: NextApiResponse){

    if(!req.body){
        res.statusCode = 404
        res.end('Error')
    }

    const {id} = req.body
    const { authorization } = req.headers;
    try{

        await middlewareTokenVerify(authorization, req, res)
        
        const user = await User.findById({id})

        if(!user){
            res.status(400).json({success: false})
        }

        res.status(200).json({success: true, data: user, token: generateToken({id: user.id})})
    }catch(error){
        res.status(400).json({success: false})
    }
    
}
