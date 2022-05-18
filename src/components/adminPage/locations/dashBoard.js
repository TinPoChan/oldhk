import React, { useState, useEffect } from "react";
import elementService from '../../../services/element'
import axios from 'axios';

const handleFetch = async () => {
    const auth = elementService.getToken();

    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + 'locations', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        }})
    return res.data;
}

function LocationDashBoard() {
    const [locations, setLocations] = useState([]);

    const fetchLocations = async () => {
        const locations = await handleFetch();
        setLocations(locations);
    }

    useEffect(() => {
        fetchLocations();
    }
        , [])

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name (Chinese)</th>
                        <th>Name (English)</th>
                        <th>District (Chinese)</th>
                        <th>District (English)</th>
                        <th>Area (Chinese)</th>
                        <th>Area (English)</th>
                        <th>Region (Chinese)</th>
                        <th>Region (English)</th>
                        <th>Exist?</th>
                        <th>Reference</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map(location => (
                        <tr key={location.id}>
                            <td>{location.id}</td>
                            <td>{location.name_zh}</td>
                            <td>{location.name_en}</td>
                            <td>{location.district_zh}</td>
                            <td>{location.district_en}</td>
                            <td>{location.area_zh}</td>
                            <td>{location.area_en}</td>
                            <td>{location.region_zh}</td>
                            <td>{location.region_en}</td>
                            <td>{location.exist}</td>
                            <td>{location.ref}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LocationDashBoard;


