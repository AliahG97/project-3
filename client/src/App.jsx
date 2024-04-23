import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <>
      <Navbar />
      {/* <Container className='aliah-container'>
        This is the shared container
      </Container> */}
      <Outlet />
    </>
  );
}

export default App;
