import React, { useState, useEffect } from "react";
import locationService from '../../../services/location'

function LocationDashBoard() {
    const [locations, setLocations] = useState([]);

    const fetchLocations = async () => {
        const locations = await locationService.getLocations();
        setLocations(locations);
    }

    useEffect(() => {
        fetchLocations();
    }, [])

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered table-sm">
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default LocationDashBoard;


