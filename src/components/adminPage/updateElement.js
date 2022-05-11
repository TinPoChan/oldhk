import React, { useState } from "react";

const initialState = {
    url_original: '',
    url_colored: '',
    url_now: '',
    location: '',
    year: '',
    author: '',
    external_url: '',
    id: '',
    description: ''
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

    return (
        <div className="form-container">
            <form className="updateElementForm" onSubmit={handleSubmit}>
                <h3>Update</h3>
                <input type='text' placeholder='id' name="id" onInput={handleChange} required={true} />
                {formText === 'Submit' ? (
                    <>
                        <input type='text' placeholder='name' name="name" onChange={handleChange} required={true} defaultValue={element.name} />
                        <input type='text' placeholder='url_original' name="url_original" onChange={handleChange} required={true} defaultValue={element.url_original} />
                        <input type='text' placeholder='url_colored' name="url_colored" onChange={handleChange} defaultValue={element.url_colored} />
                        <input type='text' placeholder='url_now' name="url_now" onChange={handleChange} required={true} defaultValue={element.url_now}/>
                        <input type='text' placeholder='location' name="location" onChange={handleChange} required={true} defaultValue={element.location}/>
                        <input type='text' placeholder='year' name="year" onChange={handleChange} required={true} defaultValue={element.year}/>
                        <input type='text' placeholder='author' name="author" onChange={handleChange} defaultValue={element.author}/>
                        <input type='text' placeholder='external_url' name="external_url" onChange={handleChange} defaultValue={element.external_url}/>
                        <input type='text' placeholder='description' name="description" onChange={handleChange} defaultValue={element.description}/>
                        <textarea type='text' placeholder='description' name="description" onChange={handleChange} defaultValue={element.description}/>
                    </>
                ) : null}

                <input type="submit" value={formText} />
            </form>
        </div>
    )
}

export default UpdateElement