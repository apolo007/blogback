const { uploadToR2 } = require('../utils/cloudflareR2');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const file = req.file;
    const imageUrl = await uploadToR2(file);
    res.json({ imageUrl });
  } catch (err) {
    console.error('Upload Controller Error:', err);
    res.status(500).json({ message: 'Image upload failed', error: err.message });
  }
};