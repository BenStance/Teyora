import React from 'react';
import '../assets/styles/footer.css'; // Updated CSS import
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaLink, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/images/logo bg.png';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container fluid>
        <Row className="custom-footer-row justify-content-center">
          {/* First Column */}
          <Col md={3} className="custom-footer-column">
            <h1 className="custom-footer-title">TEYORA</h1>
            <p className="custom-footer-copyright">&copy; 2024 TEYORA. All rights reserved.</p>
            <div className="custom-footer-icon-text">
              <FaMapMarkerAlt />
              <span> Chidachi North-Dodoma, Tanzania</span>
            </div>
            <div className="custom-footer-icon-text">
              <FaEnvelope />
              <span>info@teyora.co.tz</span>
            </div>
            <div className="custom-footer-icon-text">
              <FaPhone />
              <span>+255 622 472 600</span>
            </div>
          </Col>

          {/* Second Column */}
          <Col md={3} className="custom-footer-column text-center">
            <img src={logo} alt="TEYORA Logo" className="custom-footer-logo" />
            <span className="custom-footer-motto">Innovating for a Better Future</span><br />
            <Button variant="light" className="custom-footer-btn" href='#home-container'>Since 2023</Button>
          </Col>

          {/* Third Column */}
          <Col md={3} className="custom-footer-column">
            <h4 className="custom-footer-subtitle">Quick Links</h4>
            <Row>
              <Col xs={6}>
                <ul className="custom-footer-quick-links">
                  <li>
                    <a href="/policy"><FaLink /> Policy</a>
                  </li>
                  <li>
                    <a href="/Terms"><FaLink /> Terms of Use</a>
                  </li>
                  <li>
                    <a href="#contact"><FaLink /> Contact Us</a>
                  </li>
                </ul>
              </Col>
              <Col xs={6}>
                <ul className="custom-footer-quick-links">
                  <li>
                    <a href="./about"><FaLink /> About Us</a>
                  </li>
                  <li>
                    <a href="#learn-more"><FaLink /> Services</a>
                  </li>
                  <li>
                    <a href="./get-started"><FaLink /> Get Started</a>
                  </li>
                </ul>
              </Col>
            </Row>
            {/* Social Media Icons */}
            <div className="custom-footer-social">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="custom-footer-social-icon">
                <FaFacebookF />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="custom-footer-social-icon">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="custom-footer-social-icon">
                <FaLinkedinIn />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="custom-footer-social-icon">
                <FaInstagram />
              </a>
              <a href={`https://wa.me/${+255622472600}`} target="_blank" rel="noopener noreferrer" className="custom-footer-social-icon">
                <FaWhatsapp />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
