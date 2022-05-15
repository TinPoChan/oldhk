import React, { useState } from "react";
import { nanoid } from 'nanoid'
import uploadToS3 from "../../utils/uploadToS3";


const initialState = {
    url_original: '',
    url_colored: '',
    url_now: '',
    location: '',
    year: '',
    author: '',
    external_url: '',
    description: '',
    s3_id: '',
}

let s3_id = nanoid();

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

    const handleUpload = async (e) => {
        e.preventDefault();

        let file = e.target.files[0];
        const folderPath = 'elements/' + s3_id + '/' + file.name;

        await uploadToS3(file, folderPath);

        let url = "https://oldhk.s3.ap-east-1.amazonaws.com/" + folderPath;

        setElement({
            ...element,
            [e.target.name]: url,
            s3_id: s3_id
        })
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
                s3_id = nanoid();
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h3>Add Element</h3>

                <input className="form-control mb-2" type='text' placeholder='name' name="name" onChange={handleChange} required={true} />

                <label className="mb-1" htmlFor="url_original">URL Original: </label>
                {element.url_original ? (
                    <a href={element.url_original} target="_blank" rel="noopener noreferrer">{element.url_original}</a>
                ) : null}
                <input className="form-control mb-2" type='file' name="url_original" onChange={handleUpload} required={true} />

                <label className="mb-1" htmlFor="url_colored">URL Colored: </label>
                {element.url_colored ? (
                    <a href={element.url_colored} target="_blank" rel="noopener noreferrer">{element.url_colored}</a>
                ) : null}
                <input className="form-control mb-2" type='file' name="url_colored" onChange={handleUpload} />

                <label className="mb-1" htmlFor="url_now">URL Now: </label>
                {element.url_now ? (
                    <a href={element.url_now} target="_blank" rel="noopener noreferrer">{element.url_now}</a>
                ) : null}
                <input className="form-control mb-2" type='file' name="url_now" onChange={handleUpload} required={true} />

                <label htmlFor="location">Location: </label>
                <input className="form-control mb-2" type='text' placeholder='location' name="location" onChange={handleChange} required={true} />

                <label htmlFor="year">Year: </label>
                <input className="form-control mb-2" type='text' placeholder='year' name="year" onChange={handleChange} required={true} />

                <label htmlFor="author">Author: </label>
                <input className="form-control mb-2" type='text' placeholder='author' name="author" onChange={handleChange} />

                <label htmlFor="external_url">External URL: </label>
                <input className="form-control mb-2" type='text' placeholder='external_url' name="external_url" onChange={handleChange} />

                <label htmlFor="description">Description: </label>
                <textarea className="form-control mb-2" placeholder='description' name="description" onChange={handleChange} />
                <input className="form-control" type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default AddElement;