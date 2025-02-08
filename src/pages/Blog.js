import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {  FaLaptopCode, FaShieldAlt, FaMobileAlt } from 'react-icons/fa';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import Footer from '../pages/Footer';
import '../assets/styles/BlogStyles.css'; // Add your custom styles here
import image1 from '../assets/images/pict5.jpg'; 
import image12 from '../assets/images/blog2.jpeg'; 
import image2 from '../assets/images/pic7.jpg'; 
import image3 from '../assets/images/WebDev.jpg'; 
import webDevImage from '../assets/images/WebDev.jpg'; 
import cyberSecImage from '../assets/images/CyberSecImage.webp'; 
import AIImage from '../assets/images/AIimage.jpg';
import Subscribe from './Subscription';

const BlogPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const [modalContent, setModalContent] = useState({ title: '', text: '' });
  const [showModal, setShowModal] = useState(false);

  const handleShow = (title, text) => {
    setModalContent({ title, text });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="blog-page blog-body">
      {/* Header Section */}
      <section className="blog-header" id="home-container" style={{ background: 'linear-gradient(145deg, rgba(150, 58, 15,0.6) 0%, rgba(6, 16, 70,0.7) 100%)' }}>
        <Container>
          <Row className="align-items-center text-center text-md-left">
            <Col md={7}>
              <h1 className="header-title">Empowering Businesses with Innovative Tech Solutions</h1>
              <p className="header-subtitle">Explore our services, strategies, and insights to fuel your company's growth.</p>
            </Col>
            <Col md={5}>
              <img src={image12} alt="Tech solutions" className="header-image" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Overview */}
      <section className="services-overview">
        <Container>
          <h2 className="section-title">Our Expertise</h2>
          <Row>
            <Col md={4} data-aos="fade-up">
              <Card className="service-card">
                <FaLaptopCode className="service-icon" />
                <h4>Web Development</h4>
                <p>We create visually stunning and high-performing websites that are tailored to meet your business objectives.</p>
                <Button variant="link" onClick={() => handleShow('Web Development', 'We offer full-stack web development, ensuring that your site is both beautiful and functional. Our developers work with the latest technologies, including React, Flask, and Vue.js.')}>
                  Read More
                </Button>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="100">
              <Card className="service-card">
                <FaShieldAlt className="service-icon" />
                <h4>Cybersecurity</h4>
                <p>Protect your business with our cutting-edge cybersecurity solutions, tailored to your specific needs.</p>
                <Button variant="link" onClick={() => handleShow('Cybersecurity', 'We provide comprehensive cybersecurity services, including threat detection, incident response, and vulnerability assessments. Stay ahead of cyber threats with our robust solutions.')}>
                  Read More
                </Button>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="200">
              <Card className="service-card">
                <FaMobileAlt className="service-icon" />
                <h4>Mobile App Development</h4>
                <p>We build sleek, scalable mobile apps that engage your users and drive your business forward.</p>
                <Button variant="link" onClick={() => handleShow('Mobile App Development', 'Our mobile app development services focus on creating intuitive, high-performance applications for both Android and iOS platforms.')}>
                  Read More
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Detailed Services Explanation */}
      <section className="detailed-services">
        <Container>
          <h2 className="section-title">In-Depth Look at Our Services</h2>
          <div className="content-block">
            <div className="image-content-left" data-aos="fade-right">
              <img src={webDevImage} alt="Web Development" />
            </div>
            <div className="text-content" data-aos="fade-left">
              <h3>Customized Web Development Solutions</h3>
              <p>At TEYORA, we specialize in building custom web solutions that help businesses grow and succeed in the digital landscape. Whether it's a corporate website or a dynamic e-commerce platform, our team blends creativity with cutting-edge technologies like React, Flask, and Vue.js to deliver world-class results.</p>
              <ul>
                <li>Responsive and visually appealing designs</li>
                <li>Full-stack development</li>
                <li>Integration with third-party services</li>
              </ul>
              <Button variant="primary" href="/get-started">Start Your Project</Button>
            </div>
          </div>

          <div className="content-block reverse">
            <div className="image-content-right" data-aos="fade-left">
              <img src={cyberSecImage} alt="Cybersecurity Solutions" />
            </div>
            <div className="text-content" data-aos="fade-right">
              <h3>Advanced Cybersecurity Solutions</h3>
              <p>In today's digital age, cybersecurity is more important than ever. We offer end-to-end solutions to protect your business from cyber threats, including network security, penetration testing, and security audits. Trust us to safeguard your data and systems from vulnerabilities.</p>
              <ul>
                <li>Proactive threat monitoring</li>
                <li>Incident response and recovery</li>
                <li>Security audits and compliance</li>
              </ul>
              <Button variant="primary" href="/get-started">Learn More</Button>
            </div>
          </div>

          <div className="content-block">
            <div className="image-content-left" data-aos="fade-right">
              <img src={AIImage} alt="AI Integration" />
            </div>
            <div className="text-content" data-aos="fade-left">
              <h3>AI and Machine Learning Integration</h3>
              <p>Unlock the potential of artificial intelligence with TEYORA’s AI solutions. We help businesses integrate AI and machine learning to enhance decision-making, automate processes, and deliver personalized customer experiences.</p>
              <ul>
                <li>Predictive analytics</li>
                <li>Natural language processing</li>
                <li>Automation of repetitive tasks</li>
              </ul>
              <Button variant="primary" href="/get-started">Explore AI Solutions</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Blogs Section */}
      <section className="featured-blogs">
        <Container>
          <h2 className="section-title">Featured Blog Posts</h2>
          <Row>
            <Col md={4} data-aos="fade-up">
              <Card className="blog-card">
                <img src={image1} alt="Blog 1" className="card-img-top" />
                <Card.Body>
                  <h5 className="blog-title">How to Secure Your Business in the Digital Age</h5>
                  <p>Learn key strategies for protecting your business against cyber threats and ensuring data security.</p>
                  <Button variant="link" href="#subscription-section">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="100">
              <Card className="blog-card">
                <img src={image3} alt="Blog 2" className="card-img-top" />
                <Card.Body>
                  <h5 className="blog-title">The Power of AI in Business Transformation</h5>
                  <p>Discover how AI is revolutionizing industries and creating new opportunities for businesses you can utilize.</p>
                  <Button variant="link" href="#subscription-section">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} data-aos="fade-up" data-aos-delay="200">
              <Card className="blog-card">
                <img src={image2} alt="Blog 3" className="card-img-top" />
                <Card.Body>
                  <h5 className="blog-title">Top Trends in Web Development for 2024</h5>
                  <p>Stay ahead of the curve with the latest trends and technologies in web and mobile development.</p>
                  <Button variant="link" href="#subscription-section">Read More</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Modal for service details */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalContent.text}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Subscribe />
      <Footer />
    </div>
  );
};

export default BlogPage;
