import React, { useState } from "react";
import locationService from "../../../services/location";
import { initialState } from "./initialState";

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

        const res = await locationService.addLocation(location)
        if (!res) {
            console.log('error');
            return
        }
        console.log('success');
        clearState()
        e.target.reset()

    }

    return (
        <div className="form-container">
        <form onSubmit={handleSubmit}>
            <h3>Add Location</h3>
            <label className="mb-1" htmlFor="name_zh">Name (Chinese)</label>
            <input className="form-control mb-2" type='text' placeholder='name_zh' name="name_zh" onChange={handleChange} required={true} />
            <label className="mb-1" htmlFor="name_en">Name (English)</label>
            <input className="form-control mb-2" type='text' placeholder='name_en' name="name_en" onChange={handleChange} required={true} />
            <label className="mb-1" htmlFor="district_zh">District (Chinese)</label>
            <input className="form-control mb-2" type='text' placeholder='district_zh' name="district_zh" onChange={handleChange} required={true} />
            <label className="mb-1" htmlFor="district_en">District (English)</label>
            <input className="form-control mb-2" type='text' placeholder='district_en' name="district_en" onChange={handleChange} required={true} />
            <label className="mb-1" htmlFor="area_zh">Area (Chinese)</label>
            <input className="form-control mb-2" type='text' placeholder='area_zh' name="area_zh" onChange={handleChange}  />
            <label className="mb-1" htmlFor="area_en">Area (English)</label>
            <input className="form-control mb-2" type='text' placeholder='area_en' name="area_en" onChange={handleChange}  />
            
            <label className="mb-1" htmlFor="region_zh">Region (Chinese)</label>
            <select className="form-control mb-2" name="region_zh" onChange={handleChange} required={true}>
                <option value="">選擇地區</option>
                <option value="香港島">香港島</option>
                <option value="九龍">九龍</option>
                <option value="新界">新界</option>
            </select>
            <label className="mb-1" htmlFor="region_en">Region (English)</label>
            <select className="form-control mb-2" name="region_en" onChange={handleChange} required={true}>
                <option value="">Select Region</option>
                <option value="Hong Kong Island">Hong Kong Island</option>
                <option value="Kowloon">Kowloon</option>
                <option value="New Territories">New Territories</option>
            </select>


            {/* <input className="form-control mb-2" type='text' placeholder='exist' name="exist" defaultValue={true} onChange={handleChange} required={true} /> */}

            <label className="mb-1" htmlFor="exist">Exist?</label>
            <select className="form-control mb-2" name="exist" onChange={handleChange} required={true}>
                <option value="true">true</option>
                <option value="false">false</option>
            </select>

            <label className="mb-1" htmlFor="ref">Reference</label>
            <input className="form-control mb-2" type='text' placeholder='ref' name="ref" onChange={handleChange} required={true} />
            <input className="form-control mb-2" type="submit" value="Submit" />
        </form>
    </div>
    )
}

export default AddLocation;