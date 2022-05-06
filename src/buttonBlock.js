import React from 'react';
import Button from 'react-bootstrap/Button';

function ButtonBlock(props) {
    // eslint-disable-next-line react/prop-types
    const location  = props.element.location
    // eslint-disable-next-line react/prop-types
    let arr = [...props.randomLocations]

    // console.log(location);

    arr.push(location)

    // console.log(arr);

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    arr = shuffle(arr);

    // console.log(arr);

    const handleClick = (e) => {
        e.preventDefault();
        if(e.target.innerText === location) {
            console.log('You found the location!');
            e.target.className = 'btn-success';
        } else {
          console.log('You did not find the location!');
          e.target.className = 'btn-danger';
        }
    }


    return (
      <div className='button-container'>
        <Button variant="secondary" onClick={handleClick}>{arr[0]}</Button>
        <Button variant="secondary" onClick={handleClick}>{arr[1]}</Button>
        <Button variant="secondary" onClick={handleClick}>{arr[2]}</Button>
        <Button variant="secondary" onClick={handleClick}>{arr[3]}</Button>
      </div>
    );
  }
  
export default ButtonBlock;
