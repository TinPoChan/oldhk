import React, { useEffect, useState } from "react";

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
    ref: "",
    id: ""
}

function UpdateLocation() {
    const [location, setLocation] = useState(initialState);
    const [formText, setFormText] = useState('Search')

    const clearState = () => {
        setLocation({ ...initialState })
        setFormText('Search')
    }

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        e.preventDefault();
        setLocation(() => ({
            ...location,
            [e.target.name]: e.target.value
        }))
        
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(location);
        

        if (formText === 'Submit') {
            const backendUrl = `http://localhost:3001/api/locations/id/${location.id}`

        await fetch(backendUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(location)
        }).then((res) => {
            if (res.status === 200) {
                console.log('Location updated')
                clearState()
                e.target.reset()
            }
        }).catch(err => {
            console.log(err)
        })
    }

    if (formText === 'Search') {
        const backendUrl = `http://localhost:3001/api/locations/id/${location.id}`

        await fetch(backendUrl)
            .then(res => res.json())
            .then(data => {
                setLocation(() => data)
                setFormText('Submit')
            })
            .catch(err => {
                console.log(err)
            })
    
    }

    }

    return (
        <div className="form-container">
        <form onSubmit={handleSubmit}>
            <h3>Update Location</h3>
            <input type='text' placeholder='id' name="id" onInput={handleChange} required={true} />
            {formText === 'Submit' ? (
                <>
            <input type='text' placeholder='name_zh' name="name_zh" onChange={handleChange} required={true} defaultValue={location.name_zh}/>
            <input type='text' placeholder='name_en' name="name_en" onChange={handleChange} required={true} defaultValue={location.name_en} />
            <input type='text' placeholder='district_zh' name="district_zh" onChange={handleChange} required={true} defaultValue={location.district_zh}/>
            <input type='text' placeholder='district_en' name="district_en" onChange={handleChange} required={true} defaultValue={location.district_en}/>
            <input type='text' placeholder='area_zh' name="area_zh" onChange={handleChange}  defaultValue={location.area_zh}/>
            <input type='text' placeholder='area_en' name="area_en" onChange={handleChange}  defaultValue={location.area_en}/>

            <select name="region_zh" onChange={handleChange} required={true} defaultValue={location.region_zh}>
                <option value="">region_zh</option>
                <option value="香港島">香港島</option>
                <option value="九龍">九龍</option>
                <option value="新界">新界</option>
            </select>

            <select name="region_en" onChange={handleChange} required={true} defaultValue={location.region_en}>
                <option value="">region_en</option>
                <option value="Hong Kong Island">Hong Kong Island</option>
                <option value="Kowloon">Kowloon</option>
                <option value="New Territories">New Territories</option>
            </select>


            <input type='text' placeholder='exist' name="exist" onChange={handleChange} required={true} defaultValue={location.exist}/>
            <input type='text' placeholder='ref' name="ref" onChange={handleChange} required={true} defaultValue={location.ref}/>
            </> ) :  null }
            <input type="submit" value={formText} />
        </form>
    </div>
    )
}

export default UpdateLocation;