const { PutObjectCommand } = require("@aws-sdk/client-s3")
const { s3Client } = require("../config/aws-s3")

async function uploadFileToS3( file ) {
    try {
        const fileName = `products/${Date.now()}-${file.originalName}`

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"    
        })

        await s3Client.send(command)
    } catch (error) {
        
    }
}