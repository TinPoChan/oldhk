import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { ReactComponent as Menu } from './assets/menu.svg';
import { ReactComponent as Question } from './assets/question.svg';
import './App.css';
import React, { useEffect, useState } from 'react';


function Image(element) {
  const url = element.element.url_original;
  return (
    <div className='image-container'>
      <img src={url} alt={url} />
    </div>
  );
}

function ButtonBlock(element) {
  console.log(element.element.location);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e);
  }
  return (
    <div className='button-container'>
      <Button variant="secondary" onClick={handleClick}>{element.element.location}</Button>
      <Button variant="secondary">Mong Kok </Button>
      <Button variant="secondary">Yau Ma Tei</Button>
      <Button variant="secondary">Tai Kok</Button>
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

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    const backendUrl = 'http://localhost:3001/api/elements/' || process.env.BACKEND_URL
    fetch(backendUrl+'random')
    .then(response => response.json())
    .then(data => {
      setElement(()=>data);
    })
  }

  return (
    <div className="App">

      <HeaderBlock />
      <Line />
      <Image element={element} />
      
      <ButtonBlock element={element} />
      
    </div>
  );
}

export default App;
