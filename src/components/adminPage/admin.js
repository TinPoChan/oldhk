import React, { useState } from "react";
import AddElement from "./addElement";
import DeleteElement from "./deleteElement";
import UpdateElement from "./updateElement";
import AddLocation from "./addLocation";
import UpdateLocation from "./updateLocation";
import './admin.css';

// function AdminSideBar() {
//     return (
//         <div className="admin-sidebar">

//         </div>
//     );
// }

function ElementControls() {
    const [activeTab, setActiveTab] = useState("add");

    return (
        <>
            <div className="element-tabs">
                <button className={activeTab === "add" ? "active" : ""} onClick={() => setActiveTab("add")}>Add</button>
                <button className={activeTab === "update" ? "active" : ""} onClick={() => setActiveTab("update")}>Update</button>
                <button className={activeTab === "delete" ? "active" : ""} onClick={() => setActiveTab("delete")}>Delete</button>
            </div>
            <div className="element-content">
                {activeTab === "add" ? <AddElement /> : null}
                {activeTab === "update" ? <UpdateElement /> : null}
                {activeTab === "delete" ? <DeleteElement /> : null}
            </div>
        </>
    );
}

function LocationControls() {
    const [activeTab, setActiveTab] = useState("add");

    return (
        <>
            <div className="location-tabs">
                <button className={activeTab === "add" ? "active" : ""} onClick={() => setActiveTab("add")}>Add</button>
                <button className={activeTab === "update "? "active" : ""} onClick={() => setActiveTab("update")}>Update</button>
                <button className={activeTab === "delete" ? "active" : ""} onClick={() => setActiveTab("delete")}>Delete</button>
            </div>
            <div className="location-content">
                {activeTab === "add" ? <AddLocation /> : null}
                {activeTab === "update" ? <UpdateLocation /> : null}
                {activeTab === "delete" ? <DeleteElement /> : null}
            </div>
        </>
    );
}


function Admin() {
    const [activeTab, setActiveTab] = useState("Element");
    return (
        <div className="Admin-container">
        
            {/* <AdminSideBar /> */}
            <div className="admin-tabs">
                <div className="admin-tabs-header">
                    Dashboard
                </div>
                <button className={activeTab === "Element" ? "active" : ""} onClick={() => setActiveTab("Element")}>Element</button>
                <button className={activeTab === "Location" ? "active" : ""} onClick={() => setActiveTab("Location")}>Location</button>
            </div>
            <div className="admin-content">
            {activeTab === "Element" ? <ElementControls /> : null}
            {activeTab === "Location" ? <LocationControls /> : null}
            {/* <ElementControls />
            <AddLocation /> */}
            </div>

        </div>
    );
}

export default Admin;