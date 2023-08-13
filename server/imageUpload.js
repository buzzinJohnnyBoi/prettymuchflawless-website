const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    console.log('object');
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})
const uploadImage = multer({ storage: storage }).single('file')

module.exports = uploadImage;