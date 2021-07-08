import dbConnect  from "utils/mongodb";
import nc from 'next-connect';
import User from "../../../../models/User";
import UserImage from '../../../../models/UserImage';
import multer from 'multer';
import multerConfig from '../../middlewares/multer';
const message = require("../../../../constants/messages");

dbConnect();

const upload = nc()
.use(multerConfig.single('file')).post((req: any, res: any) => {
    // const {originalname: name, size, filename: key} = req.file;

    if(!req.file) {
        return res.send({
             status: false,
             message: 'No file uploaded'
         });
     }
})
export default upload;

// export default async (req, res) => {
//     // const {originalname: name, size, filename: key} = req.file;
//     try{
//         await multerConfig.single('file')

//         if(!req.file) {
//            return res.send({
//                 status: false,
//                 message: 'No file uploaded'
//             });
//         }


//         // const image = await UserImage.create({
//         //     name,
//         //     size,
//         //     key,
//         //     url: '',
//         //     user: id,
//         // })

//         // const user = await User.findByIdAndUpdate(id, {'imageURL': image.url, 'imageId': image._id}).select("+password");
        
//         return res.status(200).send(message(0))
//     }catch(error){
//         res.status(400).send(message(1))
//     }
// }