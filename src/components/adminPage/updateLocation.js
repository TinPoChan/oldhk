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
            .then(res => {
                if (!res.ok){
                    throw new Error('Location not found')
                }
                res.json()
            })
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
            <input className="form-control mb-2" type='text' placeholder='id' name="id" onInput={handleChange} required={true} />
            {formText === 'Submit' ? (
                <>
                <label className="mb-1" htmlFor="name_zh">Name (Chinese)</label>
            <input className="form-control mb-2" type='text' placeholder='name_zh' name="name_zh" onChange={handleChange} required={true} defaultValue={location.name_zh}/>
            <label className="mb-1" htmlFor="name_en">Name (English)</label>
            <input className="form-control mb-2" type='text' placeholder='name_en' name="name_en" onChange={handleChange} required={true} defaultValue={location.name_en} />
            <label className="mb-1" htmlFor="district_zh">District (Chinese)</label>
            <input className="form-control mb-2" type='text' placeholder='district_zh' name="district_zh" onChange={handleChange} required={true} defaultValue={location.district_zh}/>
            <label className="mb-1" htmlFor="district_en">District (English)</label>
            <input className="form-control mb-2" type='text' placeholder='district_en' name="district_en" onChange={handleChange} required={true} defaultValue={location.district_en}/>
            <label className="mb-1" htmlFor="area_zh">Area (Chinese)</label>
            <input className="form-control mb-2" type='text' placeholder='area_zh' name="area_zh" onChange={handleChange}  defaultValue={location.area_zh}/>
            <label className="mb-1" htmlFor="area_en">Area (English)</label>
            <input className="form-control mb-2" type='text' placeholder='area_en' name="area_en" onChange={handleChange}  defaultValue={location.area_en}/>

            <label className="mb-1" htmlFor="region_zh">Region (Chinese)</label>
            <select className="form-control mb-2" name="region_zh" onChange={handleChange} required={true} defaultValue={location.region_zh}>
                <option value="香港島">香港島</option>
                <option value="九龍">九龍</option>
                <option value="新界">新界</option>
            </select>

            <label className="mb-1" htmlFor="region_en">Region (English)</label>
            <select className="form-control mb-2" name="region_en" onChange={handleChange} required={true} defaultValue={location.region_en}>
                <option value="Hong Kong Island">Hong Kong Island</option>
                <option value="Kowloon">Kowloon</option>
                <option value="New Territories">New Territories</option>
            </select>

            <label className="mb-1" htmlFor="exist">Exist?</label>
            <input className="form-control mb-2" type='text' placeholder='exist' name="exist" onChange={handleChange} required={true} defaultValue={location.exist}/>

            <label className="mb-1" htmlFor="ref">Reference</label>
            <input className="form-control mb-2" type='text' placeholder='ref' name="ref" onChange={handleChange} required={true} defaultValue={location.ref}/>
            </> ) :  null }
            <input className="form-control mb-2" type="submit" value={formText} />
        </form>
    </div>
    )
}

export default UpdateLocation;