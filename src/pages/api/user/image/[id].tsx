import dbConnect  from "utils/mongodb";
import User from "../../../../models/User";
import UserImage from '../../../../models/UserImage';
import multer from 'multer';
import multerConfig from '../../middlewares/multer';
const message = require("../../../../constants/messages");

dbConnect();

export default async (req, res) => {
    const {id} = req.params;
    const {originalname: name, size, filename: key} = req.file;

    try{

        await multer(multerConfig).single('file')

        const image = await UserImage.create({
            name,
            size,
            key,
            url: '',
            user: id,
        })

        const user = await User.findByIdAndUpdate(id, {'imageURL': image.url, 'imageId': image._id}).select("+password");
        
        return res.status(200).send(message(0, user))
    }catch(error){
        res.status(400).send(message(1))
    }
}