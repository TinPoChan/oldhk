import imageCompression from 'browser-image-compression';

async function compressImage(file) {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
}

export default compressImage;