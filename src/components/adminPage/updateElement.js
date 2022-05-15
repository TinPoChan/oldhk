import React, { useState } from "react";
import uploadToS3 from "../../utils/uploadToS3";

const initialState = {
    url_original: '',
    url_colored: '',
    url_now: '',
    location: '',
    year: '',
    author: '',
    external_url: '',
    id: '',
    description: '',
    s3_id: '',
}

function UpdateElement() {
    const [element, setElement] = useState(initialState)
    const [formText, setFormText] = useState('Search')

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
        console.log(element);
        if (formText === 'Submit') {
            const backendUrl = 'http://localhost:3001/api/elements/id/' || process.env.BACKEND_URL

            await fetch(backendUrl + `${element.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(element)
            }).then((res) => {
                if (res.status === 200) {
                    console.log('Element updated')
                    clearState()
                    e.target.reset()
                }
            }).catch(err => {
                console.log(err)
            })
        }

        if (formText === 'Search') {
            const backendUrl = 'http://localhost:3001/api/elements/id/' || process.env.BACKEND_URL

            await fetch(backendUrl + `${element.id}`)
                .then(res => res.json())
                .then(data => {
                    setElement(() => data)
                    setFormText('Submit')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        let file = e.target.files[0];
        const folderPath = 'elements/' + element.s3_id + '/' + file.name;

        await uploadToS3(file, folderPath);

        let url = "https://oldhk.s3.ap-east-1.amazonaws.com/" + folderPath;

        setElement({
            ...element,
            [e.target.name]: url,
        })
    }




    return (
        <div className="form-container">
            <form className="updateElementForm" onSubmit={handleSubmit}>
                <h3>Update Element</h3>
                <input className="form-control mb-2" type='text' placeholder='id' name="id" onInput={handleChange} required={true} />
                {formText === 'Submit' ? (
                    <>
                        <label htmlFor="name">Name: </label>
                        <input className="form-control mb-2" type='text' placeholder='name' name="name" defaultValue={element.name} onChange={handleChange} required={true} />

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

                        <label htmlFor="description">Description: </label>
                        <textarea className="form-control mb-2" type='text' placeholder='description' name="description" defaultValue={element.description} onChange={handleChange} required={true} />
                    </>
                ) : null}

                <input className="form-control mb-2" type="submit" value={formText} />
            </form>
        </div>
    )
}

export default UpdateElement