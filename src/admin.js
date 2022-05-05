import React, { useState } from "react";
import Add from "./add";
import Delete from "./delete";
import Update from "./update";

function AdminPanel() {
    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>
        </div>
    );
}

function ElementControls() {
    const [activeTab, setActiveTab] = useState("add");

    return (
        <>
            <div className="admin-tabs">
                <button className={activeTab === "add" ? "active" : ""} onClick={() => setActiveTab("add")}>Add</button>
                <button className={activeTab === "update" ? "active" : ""} onClick={() => setActiveTab("update")}>Update</button>
                <button className={activeTab === "delete" ? "active" : ""} onClick={() => setActiveTab("delete")}>Delete</button>
            </div>
            <div className="admin-content">
                {activeTab === "add" ? <Add /> : null}
                {activeTab === "update" ? <Update /> : null}
                {activeTab === "delete" ? <Delete /> : null}
            </div>
        </>
    );
}
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

function Admin() {
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
        <>
            <AdminPanel />
            <ElementControls />
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h3>Add Location</h3>
                    <input type='text' placeholder='name_zh' name="name_zh" onChange={handleChange} required={true} />
                    <input type='text' placeholder='name_en' name="name_en" onChange={handleChange} required={true} />
                    <input type='text' placeholder='district_zh' name="district_zh" onChange={handleChange} required={true} />
                    <input type='text' placeholder='district_en' name="district_en" onChange={handleChange} required={true} />
                    <input type='text' placeholder='area_zh' name="area_zh" onChange={handleChange}  />
                    <input type='text' placeholder='area_en' name="area_en" onChange={handleChange}  />
                    <input type='text' placeholder='region_zh' name="region_zh" onChange={handleChange} required={true} />
                    <input type='text' placeholder='region_en' name="region_en" onChange={handleChange} required={true} />
                    <input type='text' placeholder='exist' name="exist" onChange={handleChange} required={true} />
                    <input type='text' placeholder='ref' name="ref" onChange={handleChange} required={true} />
                    <button type="submit">Add Location</button>
                </form>
            </div>
                    
        </>
    );
}

export default Admin;