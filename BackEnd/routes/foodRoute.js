const express = require("express");
const { addFood, listFood, removeFood, updateFood } = require('../controllers/foodController');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('../config/cloudinary');

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'foodImages',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), addFood);
router.post('/update', upload.single('image'), updateFood);
router.get('/list', listFood);
router.post('/remove', removeFood);

module.exports = router;
