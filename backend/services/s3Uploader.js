import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadToS3(file) {
  const fileStream = fs.createReadStream(file.path);

  const filename = `${Date.now()}_${file.originalname}`;

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
    Body: fileStream,
    ContentType: file.mimetype,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  // Public URL (because most buckets serve public files)
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
}

export default uploadToS3;
