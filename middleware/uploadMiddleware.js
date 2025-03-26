const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory as buffer
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = upload;