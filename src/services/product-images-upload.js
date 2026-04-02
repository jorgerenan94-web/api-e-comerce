const { PutObjectCommand } = require("@aws-sdk/client-s3")
const { s3Client } = require("../config/aws-s3")
const ProductsImages = require("../models/products_images")

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

        const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

        return url
    } catch (error) {
        throw new Error(error)
    }
}

async function uploadProductsImages(files) {
    if( !files || files.length === 0){
        return []
    }

    try {
        const uploadPromises = files.map(file => uploadFileToS3(file))

        const urls = await Promise.all(uploadPromises)

        return urls
    } catch (error) {
        throw new Error(error)
    }
}

async function saveProductsImages(productId, urls) {
    if(!urls || urls.length === 0){
        return []
    }

    try {
        const imagesData = urls.map(image => ({
            product_id: productId,
            url: image
        }))

        const savedImages = await ProductsImages.bulkCreate(imagesData)
        return savedImages
    } catch (error) {
        throw new Error(error)
    }
}

/**
 * Função que processa e faz o upload das imagens no S3 e salva no banco de dados
 * @param {String} productId - ID do produto
 * @param {Array} files - Array de arquivos
 * @returns {Promise<Array>} - Array de URLs das imagens salvas
 */
async function uploadAndSaveProductsImages(productId, files) {
    try {
        const urls = await uploadProductsImages(files)

        const images = await saveProductsImages(productId, urls)

        return images
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    uploadFileToS3,
    uploadProductsImages,
    saveProductsImages,
    uploadAndSaveProductsImages
}