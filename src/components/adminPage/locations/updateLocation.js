import React, { useState } from "react";
import locationService from "../../../services/location";
import { initialState } from "./initialState";

function UpdateLocation() {
    const [location, setLocation] = useState(initialState);
    const [formText, setFormText] = useState('Search')
    const [found, setFound] = useState(false)

    const clearState = () => {
        setLocation({ ...initialState })
        setFormText('Search')
    }

    const handleChange = (e) => {
        e.preventDefault();
        setLocation(() => ({
            ...location,
            [e.target.name]: e.target.value
        }))
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formText === 'Submit') {
            const res = await locationService.updateLocation(location)
            if (!res) {
                console.log('error');
                return
            }
            console.log('success');
            clearState()
            e.target.reset()
        }

        if (formText === 'Search') {
            const res = await locationService.getLocation(location.id)
            if (!res) {
                setFound(false)
                console.log('not found');
                return
            }
            setLocation(() => res)
            setFound(true)
            setFormText('Submit')
        }
    }

    return (
        <div className="form-container">
        <form onSubmit={handleSubmit}>
            <h3>Update Location</h3>
            <input className="form-control mb-2" type='text' placeholder='id' name="id" onInput={handleChange} required={true} />
            {found ? (
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