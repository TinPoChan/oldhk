import React, { useState } from "react";

function DeleteElement() {
    const [id, setId] = useState('')

    const handleChange = (e) => {
        setId(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(id);
        await fetch(`http://localhost:3001/api/elements/id/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            if (res.status === 200) {
                console.log('Element deleted')
                setId(() => '')
                e.target.reset()
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h3>Delete</h3>
                <input type='text' placeholder='id' name="id" onChange={handleChange} required={true} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default DeleteElement;