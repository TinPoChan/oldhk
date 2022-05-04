import React, { useState } from 'react';

async function Random() {
    const [element, setElement] = useState('');

    const response = await fetch('http://localhost:3001/api/elements/random');
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