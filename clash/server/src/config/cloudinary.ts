    import { v2 as cloudinary } from 'cloudinary';
    import { promises as fs } from 'fs';

    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
    });

    export async function uploadImagess(filePath: string): Promise<any> {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        console.log('Upload successful:', result);

        await fs.unlink(filePath);
        console.log('Local file deleted successfully.');
        
        return result.secure_url;
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
    }

