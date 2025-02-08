import React, {useEffect} from 'react';
import '../assets/styles/About.css';
import { FaAward, FaUsers, FaChartLine, FaLightbulb, FaGlobe,FaRocket } from 'react-icons/fa';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import company from '../assets/images/Company.png';
import TermsOfUse from './TermsOfUse';
import Policy from './policy';
import Footer from './Footer2';
import AOS from 'aos'
import Team from './Team2';
import Contact from './Contact';

const AboutPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1100, // Duration of animation (in ms)
      once: true, // Whether animation should happen only once
    });
  }, []);
  return (
    <div className="about-page" id="home-container">
      {/* Hero Section */} 
<section className="about-hero">
  <Container className="hero-container">
    <Row className="align-items-center text-center text-md-left">
      <Col md={6}>
        <div data-aos="fade-down">
          <h1 className="hero-title">About Us</h1>
          <p className="hero-subtitle">We are a team of innovative thinkers, creating cutting-edge solutions to solve real-world problems.</p>
        </div>
        <Button variant="primary" href="#mission" className="hero-button" data-aos="fade-up">Learn More</Button>
      </Col>
      <Col md={6}>
        <div className="hero-image-wrapper" data-aos="fade-left">
          <img src={company} alt="About Us" className="hero-img" />
        </div>
      </Col>
    </Row>
  </Container>
</section>

      {/* Mission Section */}
<section className="about-mission" id="mission">
  <Container>
    <h2 className="section-title">Our Mission</h2>
    <p className="section-subtitle">
      To empower businesses with innovative digital solutions that drive sustainable growth and transform industries.
    </p>
    <Row data-aos="fade-up">
      <Col md={4}>
        <Card className="mission-card">
          <FaAward className="mission-icon" />
          <h4>Excellence</h4>
          <p>
            We are committed to delivering outstanding results in every project, setting the benchmark for quality and innovation in the digital landscape.
          </p>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mission-card">
          <FaUsers className="mission-icon" />
          <h4>Collaboration</h4>
          <p>
            We believe in the power of teamwork, harnessing the collective expertise of our diverse team to deliver holistic and impactful solutions.
          </p>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="mission-card">
          <FaChartLine className="mission-icon" />
          <h4>Client Success</h4>
          <p>
            Our success is measured by the success of our clients. We are dedicated to helping businesses achieve their digital ambitions through tailored, strategic solutions.
          </p>
        </Card>
      </Col>
    </Row>
  </Container>
</section>

{/* Vision Section */}
<section className="about-vision" id="vision">
  <Container>
    <h2 className="section-title">Our Vision</h2>
    <p className="section-subtitle">
      To be a global leader in digital innovation, shaping the future by empowering businesses to thrive in an ever-evolving technological landscape.
    </p>
    <Row data-aos="fade-up">
      <Col md={4}>
        <Card className="vision-card">
          <FaLightbulb className="vision-icon" />
          <h4>Innovation</h4>
          <p>
            We aspire to continuously push the boundaries of technology, creating groundbreaking solutions that redefine industries and set new standards.
          </p>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="vision-card">
          <FaGlobe className="vision-icon" />
          <h4>Global Impact</h4>
          <p>
            Our vision is to expand our influence and reach, delivering transformative digital solutions that make a positive impact on businesses worldwide.
          </p>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="vision-card">
          <FaRocket className="vision-icon" />
          <h4>Future-Driven</h4>
          <p>
            We are dedicated to developing future-proof technologies that not only meet today's needs but also anticipate tomorrow's challenges, driving long-term success.
          </p>
        </Card>
      </Col>
    </Row>
  </Container>
</section>

< Team /> 

{/* Call to Action Section */}
<section className="about-cta">
  <Container className="cta-container">
    <Row className="align-items-center text-center text-md-left">
      <Col md={8}>
        <h2 className="cta-title">Join Us in Building the Future</h2>
        <p className="cta-text">Be part of our innovative journey and help shape the digital world. We’re excited to collaborate with forward-thinkers and pioneers.</p>
      </Col>
      <Col md={4} className="text-center">
        <Button variant="success" href="#contact" className="cta-button">Get in Touch</Button>
      </Col>
    </Row>
  </Container>
</section>
<TermsOfUse />
<Policy />
<Contact />
<Footer />
    </div>
  );
};

export default AboutPage;
