import { Upload } from "@aws-sdk/lib-storage";
// import { S3Client } from "@aws-sdk/client-s3";
import { s3Client } from "../utils/s3Client";

function uploadToS3 (file, folderPath) {
    let extn = file.name.split('.').pop();
    let contentType = 'application/octet-stream';
    if (extn === 'html') contentType = "text/html";
    if (extn === 'css') contentType = "text/css";
    if (extn === 'js') contentType = "application/javascript";
    if (extn === 'png' || extn === 'jpg' || extn === 'gif') contentType = "image/" + extn;

    try{
        const parallelUploads3 = new Upload({
            client: s3Client,
            params: { Bucket: "oldhk", Key: folderPath, Body: file, ContentType: contentType },
            leavePartsOnError: false, // optional manually handle dropped parts
        });
    
        parallelUploads3.on("httpUploadProgress", (progress) => {
            console.log(progress);
        });

        return parallelUploads3.done();
    }
    catch(err){
        return err;
    }
}

export default uploadToS3;