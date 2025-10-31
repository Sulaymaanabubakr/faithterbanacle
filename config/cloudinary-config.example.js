// Cloudinary Configuration Example
// Copy this file to cloudinary-config.js and fill in your Cloudinary credentials

const cloudinaryConfig = {
    cloudName: "YOUR_CLOUD_NAME",
    uploadPreset: "YOUR_UPLOAD_PRESET", // Create an unsigned upload preset in Cloudinary dashboard
    apiKey: "YOUR_API_KEY" // Optional, for client-side usage
};

// Cloudinary upload function
async function uploadToCloudinary(file, resourceType = 'image') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    
    const url = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/${resourceType}/upload`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Upload failed');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
}
