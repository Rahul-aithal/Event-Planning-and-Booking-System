import { Outlet } from 'react-router-dom';
import NavBar from './pages/Navbar/NavBar';
import Footer from './pages/Footer/Footer';
import React from 'react';
import Container from './components/container/Container';

function App() {
  return (
    <>
      <NavBar />
      <Container >
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
