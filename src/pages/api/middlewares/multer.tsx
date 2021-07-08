import multer from 'multer';
import  path from 'path';
import  bcrypt from 'bcryptjs';


const multerConfig = multer({
    // dest: path.resolve(__dirname,'..', '..', '..', 'tmp', 'uploads'),
    // dest: '/src/tmp/uploads',
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, '../../../tmp/uploads'); // Make sure this folder exists
        },
        filename: function(req, file, cb) {
            var ext = file.originalname.split('.').pop();
            cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
        }

    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        }else{
            cb(new Error("Invlalid file type."));
        }
    }
});


export default multerConfig;