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
  const [reset, setReset] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [reset]);

  const fetchData = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + 'elements/random');
    const json = await res.json();
    setElement(json);
  }

  useEffect(() => {
    if (element) {
      setRandomLocations(prevState => []);
      let isMounted = true;
      const fetchRandomLocation = async () => {
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + 'locations/random/' + element.location);
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
      }
      else {
        e.target.className = 'btn-danger';
      }
      setIsAnswered(true);
    }
  }

  const restartGame = () => {
    setIsAnswered(false);
    setElement(() => '');
    setRandomLocations(prevState => []);
    setReset(!reset);
  }

  function ShowInfo(element) {
    const info = element.element
    return (
      <div className='info-container'>
        <div className='info-name'>{info.name}</div>
        <div className='info-location'>{info.location}</div>
        {info.year ? <div className='info-year'>{info.year}</div> : null}
        {info.author ? <div className='info-author'>{info.author}</div> : null}
        {info.external_url ? <div className='info-url'>{info.external_url}</div> : null}
        <button className='cancel-button' onClick={restartGame}>Cancel</button>
      </div>
    );
  }

  function ButtonBlock(randomLocations){
    return (
      <div className='button-container'>
        {randomLocations.map((location, index) => {
          return (
            <Button variant="secondary" key={index} onClick={handleClick}>{location}</Button>
          )
        })}
      </div>
    );
  }


  return (
    <div className="App">
      <HeaderBlock />
      <Line />
      {randomLocations.length === 4 ? <Image element={element} /> : null}
      {randomLocations.length === 4 ? ButtonBlock(randomLocations) : null}
      {isAnswered ? <ShowInfo element={element} /> : null}
    </div>
  );
}


export default App;
