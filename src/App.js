import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as Menu } from './assets/menu.svg';
import { ReactComponent as Question } from './assets/question.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import ButtonBlock from './buttonBlock';


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

function App() {
  const [element, setElement] = useState('');
  const [randomLocations, setRandomLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3001/api/elements/random');
      const json = await res.json();
      setElement(json);
    }

    fetchData();
  }, []);

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
        }
      }
      
      fetchRandomLocation();
      return () => { isMounted = false }
    }

  }, [element]);

  
  if(element && randomLocations.length > 0) {
    // console.log(randomLocations[0]);
    return (
      <div className="App">

        <HeaderBlock />
        <Line />
        <Image element={element} />
        
        <ButtonBlock element={element} randomLocations={randomLocations} />

      </div>
    );
  }
}

export default App;
