import React, { useState } from "react";
import AddElement from "./addElement";
import DeleteElement from "./deleteElement";
import UpdateElement from "./updateElement";
import AddLocation from "./addLocation";

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
                {activeTab === "add" ? <AddElement /> : null}
                {activeTab === "update" ? <UpdateElement /> : null}
                {activeTab === "delete" ? <DeleteElement /> : null}
            </div>
        </>
    );
}
function Admin() {
    return (
        <>
            <AdminPanel />
            <ElementControls />
            <AddLocation />
                    
        </>
    );
}

export default Admin;