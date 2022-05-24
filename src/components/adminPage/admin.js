import React, { useEffect, useState } from "react";
import AddElement from "./elements/addElement";
import DeleteElement from "./elements/deleteElement";
import UpdateElement from "./elements/updateElement";
import AddLocation from "./locations/addLocation";
import UpdateLocation from "./locations/updateLocation";
import DeleteLocation from "./locations/deleteLocation";
import './admin.css';
import loginService from '../../services/login'
import ElementDashBoard from "./elements/dashBoard";
import LocationDashBoard from "./locations/dashBoard"
import userService from '../../services/user'

function Admin() {
    const [activeTab, setActiveTab] = useState("Element");
    const [contentTab, setContentTab] = useState("");
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            console.log(user);
            await userService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
        setActiveTab("Element")
        setContentTab("")
    }

    const handleClick = (event) => {
        setActiveTab(event.target.id)
        setContentTab("")
    }

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            userService.setToken(user.token)
        }
    }, [])

    function ElementControls() {
        return (
            <>
                <div className="element-tabs">
                    <button className={contentTab === "add" ? "active" : ""} onClick={() => setContentTab("add")}>Add</button>
                    <button className={contentTab === "update" ? "active" : ""} onClick={() => setContentTab("update")}>Update</button>
                    <button className={contentTab === "delete" ? "active" : ""} onClick={() => setContentTab("delete")}>Delete</button>
                </div>
                <div className="element-content">
                    {contentTab === "" ? <ElementDashBoard /> : null}
                    {contentTab === "add" ? <AddElement /> : null}
                    {contentTab === "update" ? <UpdateElement /> : null}
                    {contentTab === "delete" ? <DeleteElement /> : null}
                </div>
            </>
        );
    }

    function LocationControls() {
        return (
            <>
                <div className="location-tabs">
                    <button className={contentTab === "add" ? "active" : ""} onClick={() => setContentTab("add")}>Add</button>
                    <button className={contentTab === "update " ? "active" : ""} onClick={() => setContentTab("update")}>Update</button>
                    <button className={contentTab === "delete" ? "active" : ""} onClick={() => setContentTab("delete")}>Delete</button>
                </div>
                <div className="location-content">
                    {contentTab === "" ? <LocationDashBoard /> : null}
                    {contentTab === "add" ? <AddLocation /> : null}
                    {contentTab === "update" ? <UpdateLocation /> : null}
                    {contentTab === "delete" ? <DeleteLocation /> : null}
                </div>
            </>
        );
    }


    return (
        <div className="Admin-container">
            {user ? <>
                <div className="admin-tabs">
                    <div className="admin-tabs-header">
                        Dashboard
                    </div>
                    <button id="Element" className={activeTab === "Element" ? "active" : ""} onClick={handleClick}>Element</button>
                    <button id="Location" className={activeTab === "Location" ? "active" : ""} onClick={handleClick}>Location</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div className="admin-content">
                    {activeTab === "Element" ? <ElementControls /> : null}
                    {activeTab === "Location" ? <LocationControls /> : null}
                </div>
            </> : <>
                <div className="admin-login">
                    <form onSubmit={handleLogin}>
                        <label>Username</label>
                        <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} />
                        <label>Password</label>
                        <input type="password" className="form-control mb-2" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <button type="submit" className="form-control btn btn-primary">Login</button>
                    </form>
                </div>
            </>}
        </div>
    );
}

export default Admin;