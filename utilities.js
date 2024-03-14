const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function resizeImage(imagePath) {
    try {
        // Validate the input path
        if (!fs.existsSync(imagePath)) {
            throw new Error("Image file does not exist.");
        }

        // Ensure the file is an image
        const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".tiff"];
        const fileExtension = path.extname(imagePath).toLowerCase();
        if (!validExtensions.includes(fileExtension)) {
            throw new Error(
                "Unsupported image format. Supported formats are JPG, JPEG, PNG, WEBP, and TIFF."
            );
        }

        // Get the metadata of the image
        const metadata = await sharp(imagePath).metadata();

        // Determine if resizing is necessary
        const maxWidth = 1500;
        const maxHeight = 1500;
        if (metadata.width > maxWidth || metadata.height > maxHeight) {
            // Resize the image
            const buffer = await sharp(imagePath)
                .resize({
                    width: maxWidth,
                    height: maxHeight,
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                })
                .toBuffer();

            // Convert the buffer to a base64 string and return
            const base64 = buffer.toString("base64");
            return `data:image/${fileExtension.slice(1)};base64,${base64}`;
        } else {
            // Image does not need resizing, return original image as base64
            const originalBuffer = fs.readFileSync(imagePath);
            const base64 = originalBuffer.toString("base64");
            return `data:image/${fileExtension.slice(1)};base64,${base64}`;
        }
    } catch (error) {
        console.error("Error processing the image:", error.message);
        throw error;
    }
}

module.exports = {
    resizeImage
};
