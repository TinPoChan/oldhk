import React, { useState } from "react";
import { nanoid } from 'nanoid'
import uploadToS3 from "../../../utils/uploadToS3";
import { initialState } from './initialState'

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

        let url = process.env.REACT_APP_S3_URL + folderPath;

        setElement({
            ...element,
            [e.target.name]: url,
            s3_id: s3_id
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(process.env.REACT_APP_BACKEND_URL + 'elements', {
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

                <label htmlFor="name_zh">Name (Chinese)</label>
                <input className="form-control mb-2" type='text' placeholder='name_zh' name="name_zh" onChange={handleChange} required={true} />

                <label htmlFor="name_en">Name (English)</label>
                <input className="form-control mb-2" type='text' placeholder='name_en' name="name_en" onChange={handleChange} />

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

                <label htmlFor="description_zh">Description (Chinese)</label>
                <textarea className="form-control mb-2" type='text' placeholder='description_zh' name="description_zh" onChange={handleChange} />

                <label htmlFor="description_en">Description (English)</label>
                <textarea className="form-control mb-2" type='text' placeholder='description_en' name="description_en" onChange={handleChange} />

                <input className="form-control mb-2" type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default AddElement;