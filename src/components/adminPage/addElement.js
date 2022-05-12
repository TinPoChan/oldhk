import React, { useState } from "react";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";



const initialState = {
    url_original: '',
    url_colored: '',
    url_now: '',
    location: '',
    year: '',
    author: '',
    external_url: '',
    description: ''
}

function AddElement() {
    const [element, setElement] = useState(initialState)

    const clearState = () => {
        setElement({ ...initialState })
    }

    const handleChange = (e) => {
        setElement({
            ...element,
            [e.target.name]: e.target.value
        })
    }

    const upload = async (e) => {
        let file = e.target.files[0];

        let extn = file.name.split('.').pop();
        let contentType = 'application/octet-stream';
        if (extn === 'html') contentType = "text/html";
        if (extn === 'css') contentType = "text/css";
        if (extn === 'js') contentType = "application/javascript";
        if (extn === 'png' || extn === 'jpg' || extn === 'gif') contentType = "image/" + extn;

        try {
            const parallelUploads3 = new Upload({
                client: new S3Client({ region: "ap-east-1", credentials: { accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY, secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY } }),
                params: { Bucket: "oldhk", Key: file.name, Body: file, ContentType: contentType },
                leavePartsOnError: false, // optional manually handle dropped parts
            });

            parallelUploads3.on("httpUploadProgress", (progress) => {
                console.log(progress);
            });

            await parallelUploads3.done();
        } 
        catch (e) {
            console.log(e);
        }


    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:3001/api/elements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(element)
        }).then((res) => {
            if (res.status === 201) {
                console.log('Element added')
                clearState()
                e.target.reset()
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h3>Add</h3>
                <input type='text' placeholder='name' name="name" onChange={handleChange} required={true} />
                {/* <input type='text' placeholder='url_original' name="url_original" onChange={handleChange} required={true} /> */}
                <input type='file' placeholder='url_original' name="url_original" onChange={upload} required={true} />
                <input type='text' placeholder='url_colored' name="url_colored" onChange={handleChange} />
                <input type='text' placeholder='url_now' name="url_now" onChange={handleChange} required={true} />
                <input type='text' placeholder='location' name="location" onChange={handleChange} required={true} />
                <input type='text' placeholder='year' name="year" onChange={handleChange} required={true} />
                <input type='text' placeholder='author' name="author" onChange={handleChange} />
                <input type='text' placeholder='external_url' name="external_url" onChange={handleChange} />
                <textarea placeholder='description' name="description" onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default AddElement;