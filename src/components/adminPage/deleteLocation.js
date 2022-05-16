import React, { useState } from "react";

function DeleteLocation() {
    const [id, setId] = useState('')

    const handleChange = (e) => {
        setId(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(id);
        await fetch(`http://localhost:3001/api/locations/id/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            if (res.status === 200) {
                console.log('Location deleted')
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
                <h3>Delete Location</h3>
                <input className="form-control mb-2" type='text' placeholder='id' name="id" onChange={handleChange} required={true} />
                <input className="form-control mb-2" type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default DeleteLocation;