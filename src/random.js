import React, { useState } from 'react';

async function Random() {
    const [element, setElement] = useState('');
    const backendUrl = 'http://localhost:3001/api/elements/' || process.env.BACKEND_URL
    const response = await fetch(backendUrl+'random');
    const data = await response.json();
    setElement(data);
    console.log(element);

    return (
        <>
            {element}
        </>
    );
}

export default Random;