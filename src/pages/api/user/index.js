import dbConnect  from "utils/mongodb";
import User from "../../../models/User";

dbConnect();

export default async (req, res) => {
    const {method} = req;
    switch(method){
        case 'GET':
             const {page, limit} = req.query
            try{
                const users = await User.find({})
                .skip( parseInt(page) * parseInt(limit) )
                .limit(parseInt(limit))

                res.status(200).json({success: true, data: users})
            }catch(error){
                res.status(400).json({success: false})
            }
            break;
        case 'POST':
            try{
                const user = await User.create(req.body);
                return res.status(200).json({success: true, data: user})
            }catch(error){
                return res.status(400).json({success: false})
            }
            break;
        default: 
            res.status(400).json({success: false})
            break;

    };
}