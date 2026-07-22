const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'tyuautgtp',
  api_key: process.env.CLOUDINARY_API_KEY || '559597211285181',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'd4La0AEsgE2G06c_JYlb2jpYYbI'
});

// POST /api/upload - Upload base64 or image URL to Cloudinary
router.post('/', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ message: 'No image data provided.' });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: 'blackdistrict_products',
      resource_type: 'auto'
    });

    res.json({
      url: result.secure_url,
      public_id: result.public_id
    });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    res.status(500).json({ message: 'Cloudinary upload failed.', error: error.message });
  }
});

module.exports = router;
