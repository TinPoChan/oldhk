import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as Menu } from './assets/menu.svg';
import { ReactComponent as Question } from './assets/question.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';



function Image(element) {
  const url = element.element.url_original;
  return (
    <div className='image-container'>
      <img src={url} alt={url} />
    </div>
  );
}

function HeaderBlock() {
  return (
    <header className="App-header">
      <Menu className='App-menu' />
      <div className='App-logo'>OLDHK</div>
      <Question className='App-question' />
    </header>
  );
}

function Line() {
  return (
    <div className='line'></div>
  )
}

// function ButtonBlock(props) {
//   // eslint-disable-next-line react/prop-types
//   const location = props.element.location
//   // eslint-disable-next-line react/prop-types
//   let arr = [...props.randomLocations]

//   // console.log(location);

//   // arr.push(location)

//   // console.log(arr);



//   // arr = shuffle(arr);

//   // console.log(arr);

//   const handleClick = (e) => {
//     // eslint-disable-next-line react/prop-types
//     // props.setIsAnswered(true);
//     e.preventDefault();
//     if (props)
//       if (e.target.innerText === location) {
//         console.log('You found the location!');
//         e.target.className = 'btn-success';
//       } else {
//         console.log('You did not find the location!');
//         e.target.className = 'btn-danger';
//       }
//   }


//   return (
//     <div className='button-container'>
//       <Button variant="secondary" onClick={handleClick}>{arr[0]}</Button>
//       <Button variant="secondary" onClick={handleClick}>{arr[1]}</Button>
//       <Button variant="secondary" onClick={handleClick}>{arr[2]}</Button>
//       <Button variant="secondary" onClick={handleClick}>{arr[3]}</Button>
//     </div>
//   );
// }

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



function App() {
  const [element, setElement] = useState('');
  const [randomLocations, setRandomLocations] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [reset, setReset] = useState(false);



  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [reset]);

  const fetchData = async () => {
    const res = await fetch('http://localhost:3001/api/elements/random');
    const json = await res.json();
    setElement(json);
  }

  useEffect(() => {
    if (element) {
      let isMounted = true;
      const fetchRandomLocation = async () => {
        const res = await fetch('http://localhost:3001/api/locations/random/' + element.location);
        const json = await res.json();
        if (isMounted) {
          for (let i = 0; i < json.length; i++) {
            setRandomLocations(prevState => [...prevState, json[i]]);
          }
          setRandomLocations(prevState => [...prevState, element.location]);
          setRandomLocations(prevState => shuffle(prevState));
        }
      }

      fetchRandomLocation();
      return () => { isMounted = false }
    }

  }, [element]);


  const handleClick = (e) => {
    if (!isAnswered) {
      if (e.target.innerText === element.location) {
        e.target.className = 'btn-success';
        setIsCorrect(true);
      }
      else {
        e.target.className = 'btn-danger';
        setIsCorrect(false);
      }
      setIsAnswered(true);
    }
  }

  const restartGame = () => {
    setIsAnswered(false);
    setIsCorrect(false);
    setElement(()=>'');
    setRandomLocations(prevState => []);
    setReset(!reset);
    
  }

  function info(element) {
    return (
      <div className='info-container'>
        <div className='info-name'>{element.name}</div>
        <div className='info-location'>{element.location}</div>
        {element.year ? <div className='info-year'>{element.year}</div> : null}
        {element.author ? <div className='info-author'>{element.author}</div> : null}
        {element.external_url ? <div className='info-url'>{element.external_url}</div> : null}
        <button className='cancel-button' onClick={restartGame}>Cancel</button>
      </div>
    );
  }



    return (
      <div className="App">

        <HeaderBlock />
        <Line />
        <Image element={element} />

        {/* <ButtonBlock element={element} randomLocations={randomLocations} /> */}

        <div className='button-container'>

          {randomLocations.map((location, index) => {
            return (
              <Button variant="secondary" key={index} onClick={handleClick}>{location}</Button>
            )
          })}
          
          {/* <Button variant="secondary" onClick={handleClick}>{randomLocations[0]}</Button>
          <Button variant="secondary" onClick={handleClick}>{randomLocations[1]}</Button>
          <Button variant="secondary" onClick={handleClick}>{randomLocations[2]}</Button>
          <Button variant="secondary" onClick={handleClick}>{randomLocations[3]}</Button> */}
        </div>

          {isAnswered && isCorrect && <>{info(element)}</>}
          {isAnswered && !isCorrect && <>{info(element)}</>}

      </div>
    );
  }


export default App;
