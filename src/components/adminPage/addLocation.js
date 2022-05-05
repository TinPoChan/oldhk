import React, { useState } from "react";

const initialState = {
    name_zh: "",
    name_en: "",
    district_zh: "",
    district_en: "",
    area_zh: "",
    area_en: "",
    region_zh: "",
    region_en: "",
    exist: true,
    ref: ""
}

function AddLocation() {
    const [location, setLocation] = useState(initialState);

    const clearState = () => {
        setLocation({ ...initialState })
    }

    const handleChange = (e) => {
        setLocation({
            ...location,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(location);

        await fetch('http://localhost:3001/api/locations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(location)
        }).then((res) => {
            if (res.status === 201) {
                console.log('Location added')
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
            <h3>Add Location</h3>
            <input type='text' placeholder='name_zh' name="name_zh" onChange={handleChange} required={true} />
            <input type='text' placeholder='name_en' name="name_en" onChange={handleChange} required={true} />
            <input type='text' placeholder='district_zh' name="district_zh" onChange={handleChange} required={true} />
            <input type='text' placeholder='district_en' name="district_en" onChange={handleChange} required={true} />
            <input type='text' placeholder='area_zh' name="area_zh" onChange={handleChange}  />
            <input type='text' placeholder='area_en' name="area_en" onChange={handleChange}  />

            <select name="region_zh" onChange={handleChange} required={true}>
                <option value="">region_zh</option>
                <option value="香港島">香港島</option>
                <option value="九龍">九龍</option>
                <option value="新界">新界</option>
            </select>

            <select name="region_en" onChange={handleChange} required={true}>
                <option value="">region_en</option>
                <option value="Hong Kong Island">Hong Kong Island</option>
                <option value="Kowloon">Kowloon</option>
                <option value="New Territories">New Territories</option>
            </select>


            <input type='text' placeholder='exist' name="exist" defaultValue={true} onChange={handleChange} required={true} />
            <input type='text' placeholder='ref' name="ref" onChange={handleChange} required={true} />
            <button type="submit">Add Location</button>
        </form>
    </div>
    )
}

export default AddLocation;