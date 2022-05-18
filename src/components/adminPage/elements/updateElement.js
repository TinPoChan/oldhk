import React, { useState } from "react";
import uploadToS3 from "../../../utils/uploadToS3";
import { initialState } from "./initialState";
import elementService from "../../../services/element"

function UpdateElement() {
    const [element, setElement] = useState(initialState)
    const [formText, setFormText] = useState('Search')
    const [found, setFound] = useState(false)

    const clearState = () => {
        setElement({ ...initialState })
        setFormText('Search')
    }

    const handleChange = (e) => {
        setElement({
            ...element,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formText === 'Submit') {
            const res = await elementService.updateElement(element)
            if (!res) {
                console.log('error');
            }
            console.log('success');
            clearState()
            e.target.reset()
        }

        if (formText === 'Search') {
            const res = await elementService.getElement(element.id)
            if (!res) {
                setFound(false)
                console.log('not found');
            }
            setElement(() => res)
            setFound(true)
            setFormText('Submit')
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        let file = e.target.files[0];
        const folderPath = 'elements/' + element.s3_id + '/' + file.name;

        await uploadToS3(file, folderPath);

        let url = process.env.REACT_APP_S3_URL + folderPath;

        setElement({
            ...element,
            [e.target.name]: url,
        })
    }


    return (
        <div className="form-container">
            <form className="updateElementForm" onSubmit={handleSubmit}>
                <h3>Update Element</h3>
                
                <label htmlFor="id">ID</label>
                <input className="form-control mb-2" type='text' placeholder='id' name="id" onInput={handleChange} required={true} />
                {found ? (
                    <>
                        <label htmlFor="name_zh">Name (Chinese)</label>
                        <input className="form-control mb-2" type='text' placeholder='name_zh' name="name_zh" defaultValue={element.name_zh} onChange={handleChange} required={true} />

                        <label htmlFor="name_en">Name (English)</label>
                        <input className="form-control mb-2" type='text' placeholder='name_en' name="name_en" defaultValue={element.name_en} onChange={handleChange} />

                        <label className="mb-1" htmlFor="url_original">URL Original: </label>
                        {element.url_original ? (
                            <a href={element.url_original} target="_blank" rel="noopener noreferrer">{element.url_original}</a>
                        ) : null}
                        <input className="form-control mb-2" type='file' name="url_original" onChange={handleUpload} />

                        <label className="mb-1" htmlFor="url_colored">URL Colored: </label>
                        {element.url_colored ? (
                            <a href={element.url_colored} target="_blank" rel="noopener noreferrer">{element.url_colored}</a>
                        ) : null}
                        <input className="form-control mb-2" type='file' name="url_colored" onChange={handleUpload} />

                        <label className="mb-1" htmlFor="url_now">URL Now: </label>
                        {element.url_now ? (
                            <a href={element.url_now} target="_blank" rel="noopener noreferrer">{element.url_now}</a>
                        ) : null}
                        <input className="form-control mb-2" type='file' name="url_now" onChange={handleUpload} />

                        <label htmlFor="location">Location: </label>
                        <input className="form-control mb-2" type='text' placeholder='location' name="location" defaultValue={element.location} onChange={handleChange} required={true} />

                        <label htmlFor="year">Year: </label>
                        <input className="form-control mb-2" type='text' placeholder='year' name="year" defaultValue={element.year} onChange={handleChange} required={true} />

                        <label htmlFor="author">Author: </label>
                        <input className="form-control mb-2" type='text' placeholder='author' name="author" defaultValue={element.author} onChange={handleChange} required={true} />

                        <label htmlFor="external_url">External URL: </label>
                        <input className="form-control mb-2" type='text' placeholder='external_url' name="external_url" defaultValue={element.external_url} onChange={handleChange} required={true} />

                        <label htmlFor="description_zh">Description (Chinese)</label>
                        <textarea className="form-control mb-2" type='text' placeholder='description_zh' name="description_zh" defaultValue={element.description_zh} onChange={handleChange} required={true} />

                        <label htmlFor="description_en">Description (English)</label>
                        <textarea className="form-control mb-2" type='text' placeholder='description_en' name="description_en" defaultValue={element.description_en} onChange={handleChange} required={true} />
                    </>
                ) : null}

                <input className="form-control mb-2" type="submit" value={formText} />
            </form>
        </div>
    )
}

export default UpdateElement