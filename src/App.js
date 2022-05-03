import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { ReactComponent as Menu } from './assets/menu.svg';
import { ReactComponent as Question } from './assets/question.svg';
import './App.css';

function Image() {
  return (
    <div className='image-container'>
      <svg width="400" height="100">
        <rect width="400" height="100" />
      </svg>
    </div>
  );
}

function ButtonBlock() {
  return (
    <div className='button-container'>
      <Button variant="secondary">Info</Button>
      <Button variant="secondary">Info</Button>
      <Button variant="secondary">Info</Button>
      <Button variant="secondary">Info</Button>
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
  return (
    <div className="App">

      <HeaderBlock />
      <Line />
      <Image />
      <ButtonBlock />
      
    </div>
  );
}

export default App;
