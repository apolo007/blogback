const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY,
  },
});

const uploadToR2 = async (file) => {
  try {
    const key = `images/${Date.now()}-${file.originalname}`; // Use originalname from multer
    const params = {
      Bucket: process.env.CLOUDFLARE_R2_BUCKET,
      Key: key,
      Body: file.buffer, // Use buffer directly from multer
      ContentType: file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(params));
    return `https://imagedata.growwithdigitals.com/${key}`;
  } catch (err) {
    console.error('R2 Upload Error:', err);
    throw err;
  }
};

module.exports = { uploadToR2 };