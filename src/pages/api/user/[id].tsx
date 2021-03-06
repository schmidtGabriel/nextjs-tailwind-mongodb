import dbConnect  from "utils/mongodb";
import User from "../../../models/User";
const message = require("../../../utils/messages");

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method}
         = req;

    switch(method){
        case 'GET':
            try{
                const user = await User.findById(id).select("+password")

                if(!user){
                    res.status(400).send(message(2))
                }


                res.status(200).send(message(0, user))

            }catch(error){
                res.status(400).send(message(1))
            }
            break;
        case 'PUT':
            try{
                const user = await User.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                }).select("+password")

                if(!user){
                    res.status(400).send(message(2))
                }

                res.status(200).send(message(0, user))
            }catch(error){
                res.status(400).send(message(1))
            }
            break;
        case 'DELETE':
            try{
                const user = await User.deleteOne({_id: id})

                if(!user){
                    res.status(400).json({success: false})
                }
                res.status(200).json({success: true, data: {}})
            }catch(error){
                res.status(400).send(message(1))
            }
            break;
        default: 
                res.status(400).send(message(1))
            break;

    };
}