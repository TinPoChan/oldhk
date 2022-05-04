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

function Admin() {
    const [activeTab, setActiveTab] = useState("add");

    return (
        <>
            <AdminPanel />
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

export default Admin;