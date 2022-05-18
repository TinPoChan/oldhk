import React, { useState, useEffect } from "react";
import elementService from '../../../services/element'
import DetailElement from "./detailElement";

function ElementDashBoard() {
    const [elements, setElements] = useState([]);
    const [element, setElement] = useState(null);
    const [clear, setClear] = useState(false);

    const fetchElements = async () => {
        const elements = await elementService.getElements();
        setElements(elements);
    }

    useEffect(() => {
        fetchElements();
    }, [])

    const handleClick = async (e, id) => {
        if(e.target.id === 'delete') {
            const deleted = await elementService.deleteElement(id);
            if(deleted) {
                fetchElements();
            }
        }
        if(e.target.id === 'check') {
            setElement(await elementService.getElement(id));
            setClear(false);
        }
    }
    
    if (element !== null && !clear) {
        return (
            <>
            
            <div className="detail-element">
                <DetailElement element={element} />
                <button id="clearButton" onClick={() => setClear(true)}>clear</button>
            </div>
            </>
        )
    } else {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered table-sm">
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
                            {/* <td><button id="check" type="button" className="btn btn-primary" onClick={(e) => handleClick(e, element.id)}>Check</button></td> */}
                            <td><button id="delete" type="button" className="btn btn-danger" onClick={(e) => handleClick(e, element.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
}

export default ElementDashBoard;