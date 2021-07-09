import dbConnect  from "utils/mongodb";
import User from "../../../models/User";
const message = require("../../../utils/messages");

dbConnect();

export default async (req, res) => {
    const {method} = req;
    switch(method){
        case 'GET':
             const {page, limit} = req.query
            try{
                const users = await User.find({}).select("+password")
                .skip( parseInt(page) * parseInt(limit) )
                .limit(parseInt(limit))

                res.status(200).send({success: true, data: users})
            }catch(error){
                res.status(400).send(message(1))
            }
            break;
        case 'POST':
            try{
                req.body.confirmPassword = undefined

                const user = await User.create(req.body);
                user.password = undefined
                
                return res.status(200).send(message(0, user))
            }catch(error){
                res.status(400).send(message(1))
            }
            break;
        default: 
        res.status(400).send(message(1))
            break;

    };
}