import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './pages/Navbar/NavBar';
import Footer from './pages/Footer/Footer';
import Container from './components/container/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
