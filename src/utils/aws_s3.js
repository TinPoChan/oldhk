// import { Upload } from "@aws-sdk/lib-storage";
// import { S3Client, S3 } from "@aws-sdk/client-s3";

// try {
//   const parallelUploads3 = new Upload({
//     client: new S3({}) || new S3Client({}),
//     params: { Bucket, Key, Body },

//     tags: [
//       /*...*/
//     ], // optional tags
//     queueSize: 4, // optional concurrency configuration
//     partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
//     leavePartsOnError: false, // optional manually handle dropped parts
//   });

//   parallelUploads3.on("httpUploadProgress", (progress) => {
//     console.log(progress);
//   });

//   await parallelUploads3.done();
// } catch (e) {
//   console.log(e);
// }