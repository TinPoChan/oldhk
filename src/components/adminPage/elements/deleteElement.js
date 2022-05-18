import React, { useState } from "react";
import elementService from '../../../services/element'

function DeleteElement() {
    const [id, setId] = useState('')

    const handleChange = (e) => {
        setId(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = elementService.deleteElement(id);

        if(res) {
            setId('')
            e.target.reset()
        } else {
            console.log('error');
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h3>Delete</h3>
                <input className="form-control mb-2" type='text' placeholder='id' name="id" onChange={handleChange} required={true} />
                <input className="form-control mb-2" type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default DeleteElement;