import React from 'react';
import Button from 'react-bootstrap/Button';

function ButtonBlock(props) {
    // eslint-disable-next-line react/prop-types
    const location  = props.element.location
    // eslint-disable-next-line react/prop-types
    const arr = [...props.randomLocations]

    console.log(location);

    arr.push(location)

    console.log(arr);

    return (
      <div className='button-container'>
          
        <Button variant="secondary">{location}</Button>
        <Button variant="secondary"></Button>
        <Button variant="secondary">Yau Tei</Button>
        <Button variant="secondary">Tai Kok</Button>
      </div>
    );
  }
  
export default ButtonBlock;
