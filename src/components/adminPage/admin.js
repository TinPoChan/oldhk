import React, { useState } from "react";
import AddElement from "./elements/addElement";
import DeleteElement from "./elements/deleteElement";
import UpdateElement from "./elements/updateElement";
import AddLocation from "./addLocation";
import UpdateLocation from "./updateLocation";
import DeleteLocation from "./deleteLocation";
import './admin.css';
import loginService from '../../services/login'
import elementService from '../../services/element'


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
                <button className={activeTab === "update " ? "active" : ""} onClick={() => setActiveTab("update")}>Update</button>
                <button className={activeTab === "delete" ? "active" : ""} onClick={() => setActiveTab("delete")}>Delete</button>
            </div>
            <div className="location-content">
                {activeTab === "add" ? <AddLocation /> : null}
                {activeTab === "update" ? <UpdateLocation /> : null}
                {activeTab === "delete" ? <DeleteLocation /> : null}
            </div>
        </>
    );
}


function Admin() {
    const [activeTab, setActiveTab] = useState("Element");
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 
    const [user, setUser] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try{
            const user = await loginService.login({
                username, password,
            })
            console.log(user);
            elementService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error);
        }
      }

    return (
        <div className="Admin-container">
            {user ? <>
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
            </div>
            </> : <>
                <div className="admin-login">
                    <form onSubmit={handleLogin}>
                        <label>Username</label>
                        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                        <label>Password</label>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </>}


        </div>
    );
}

export default Admin;