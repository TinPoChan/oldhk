import React, { useState, useEffect } from "react";
import elementService from '../../../services/element'
import axios from 'axios';

const handleFetch = async () => {
    const auth = elementService.getToken();

    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + 'elements', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        }})
    return res.data;


}

function ElementDashBoard() {
    const [elements, setElements] = useState([]);

    const fetchElements = async () => {
        const elements = await handleFetch();
        setElements(elements);
    }

    useEffect(() => {
        fetchElements();
    }, [])

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name (Chinese)</th>
                        <th>Name (English)</th>
                        <th>Location</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {elements.map(element => (
                        <tr key={element.id}>
                            <td>{element.id}</td>
                            <td>{element.name_zh}</td>
                            <td>{element.name_en}</td>
                            <td>{element.location}</td>
                            <td>{element.year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ElementDashBoard;