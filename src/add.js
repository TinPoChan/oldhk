import React, { useState } from "react";

const initialState = {
    url_original: '',
    url_colored: '',
    url_now: '',
    location: '',
    year: '',
    author: '',
    external_url: ''
}

function Add() {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(element);

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
                <input type='text' placeholder='url_original' name="url_original" onChange={handleChange} required={true} />
                <input type='text' placeholder='url_colored' name="url_colored" onChange={handleChange} />
                <input type='text' placeholder='url_now' name="url_now" onChange={handleChange} required={true} />
                <input type='text' placeholder='location' name="location" onChange={handleChange} required={true} />
                <input type='text' placeholder='year' name="year" onChange={handleChange} required={true} />
                <input type='text' placeholder='author' name="author" onChange={handleChange} />
                <input type='text' placeholder='external_url' name="external_url" onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Add;