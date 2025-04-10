const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

//Diskstorage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, buffer) => {
            // console.log(buffer.toString('hex'));
            const fn = buffer.toString('hex') + path.extname(file.originalname);  //path.extname is used to get the file extension
            //file.originalname is the name of the file which we are uploading
            cb(null, fn);
        })
      
    }
})
const upload = multer({ storage: storage })


module.exports = upload; // Export the upload object for use in other files