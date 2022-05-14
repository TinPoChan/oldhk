// Create service client module using ES6 syntax.
import { S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = "ap-east-1"; //e.g. "us-east-1"
const credentials = {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
}
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION, credentials: credentials });
export { s3Client };

