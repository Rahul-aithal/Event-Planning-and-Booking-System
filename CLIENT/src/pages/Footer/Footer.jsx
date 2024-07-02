import React from 'react';
import { Container } from 'react-bootstrap';
import './footer.css';

function Footer() {
  return (
    <footer className="footer bg-dark text-white py-3 mt-auto">
      <Container className="text-center">
        <p className="mb-1">
          Discover, Book, and Celebrate with Us! Find the perfect events for every occasion, from parties to conferences, and make every moment unforgettable.
        </p>
        <p className="mb-0">&copy; 2024 Your Event Booking Website</p>
      </Container>
    </footer>
  );
}

export default Footer;
