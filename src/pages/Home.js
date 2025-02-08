import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Carousel, Row, Col, Button, Modal } from 'react-bootstrap';
// import { FaFacebookF, FaTwitter, FaStar, FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import '../assets/styles/Home.css';
import Testimonials from './Testimonials';
import Portfolio from './Portfolio';
import Team from './Team';
import Footer from './Footer';
import Popup from './Popup';
import webDevImage from '../assets/images/WebDev.jpg';
import cyberSecImage from '../assets/images/CyberSecImage.webp';
import SocialMedia from '../assets/images/SocialMedia.webp';
import Networking from '../assets/images/Networking.png';
import AIimage from '../assets/images/AIimage.jpg';
import image1 from "../assets/images/pict1.jpg";
import image2 from "../assets/images/pict4.jpg";
import image3 from "../assets/images/pict6.jpg";
import contpic1 from "../assets/images/contPic1.jpg";
import contpic2 from "../assets/images/contpic2.webp";
import contpic3 from "../assets/images/contpic3.jpg";
import DownloadableResources from './Downloadresourse';
import Subscription from './Subscription';
import Contact from './Contact';


const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1100, // Duration of animation (in ms)
      once: true, // Whether animation should happen only once
    });
  }, []);

  const serviceData = [
    {
      image: contpic1, // Replace with your image path
      title: "Fortify Your Digital Fortress: Ironclad Security",
      description: "In digital landscape, security is paramount. Our cybersecurity experts are your digital guardians, safeguarding your data and systems with cutting-edge solutions. Trust TEYORA to protect your business from emerging threats.",
    },
    {
      image: contpic2, // Replace with your image path
      title: "Crafting Digital Masterpieces: Your Vision, Our Expertise",
      description: "From concept to creation, we weave digital magic that captivates and converts. Our expert web developers blend artistry with technology to build websites that stand out and drive results. Experience the TEYORA difference today.",
      },
    {
      image: contpic3, // Replace with your image path
      title: "Your Tech Catalyst: Accelerate Growth with TEYORA",
      description: "We're more than just a tech provider; we're your strategic partner. Our innovative solutions and deep industry expertise empower businesses to thrive in the digital age. Let TEYORA be your catalyst for success.",
    },
  ];
  const [clickedButtons, setClickedButtons] = useState([]);

const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', text: '' });

  const handleShow = (title, text) => {
    setModalContent({ title, text });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);



  return (
    <div className="home-container" id='home-container'>
      <Carousel className="carousel-background">
        <Carousel.Item>
          <div className="overlay"></div>
          <img className="d-block w-100" src={image1} alt="First slide" />
          <div className="carousel-caption" >
            <h3 className="tagline" data-aos="fade-down">Innovating the Future of Digital Solutions</h3>
            <a href='./get-started'>
              <Button className="home-button2" data-aos="fade-up">Get Started</Button>
            </a>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="overlay"></div>
          <img className="d-block w-100" src={image2} alt="Second slide" />
          <div className="carousel-caption" >
            <h3 className="tagline">Empowering Your Digital Journey</h3>
            <a href='#contact'>
              <Button className="home-button2">Contact Us</Button></a>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="overlay"></div>
          <img className="d-block w-100" src={image3} alt="Third slide" />
          <div className="carousel-caption" >
            <h3 className="tagline">Building Tomorrow's Technology Today</h3>
            <a href='#learn-more'>
            <Button className="home-button2">Learn More</Button></a>
          </div>
        </Carousel.Item>
      </Carousel>
  
      <div className="container-fluid centered-container cont-bg2" data-aos="fade-up">
      <Row className="justify-content-center mt-5 ">
        {serviceData.map((service, index) => (
          <Col md={4} key={index}>
            <div className="service-container">
              <img src={service.image} alt={service.title} className="service-image" />
              <div className="service-content">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <a href="#Explore" className="explore-more">Explore More <i className="fas fa-arrow-right"></i></a>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>

{/* here is where the paragraphs and images start */}
    <div className="content-section cont-bg" id="learn-more">
      <h2 className="section-title">What Our Services Offer</h2>

      <div className="content-block">
        <div className="text-content" data-aos="fade-right">
          <h2>Crafting Digital Experiences</h2>
          <p> Optimize your business operations with our expert IA integration services. We seamlessly connect your systems and data, improving efficiency, accuracy, and decision-making. Let us streamline your workflows and unlock the full potential of your business through intelligent automation.</p>          
          <div className="home-button" data-aos="fade-up" onClick={() => handleShow('Crafting Digital Experiences', 'Our expert IA integration services optimize your business operations by seamlessly connecting your systems and data. This leads to enhanced efficiency, improved accuracy, data-driven decisions, scalability, and cost-effectiveness. We conduct a thorough assessment of your needs, design tailored solutions, ensure seamless integration, and provide ongoing support. By leveraging our IA expertise, you can transform your business, improve customer satisfaction, and stay ahead of the competition. Contact us today to learn how our IA integration services can benefit your organization.')}>
            <span>Read More</span>
          </div>
        </div>
        <div className="image-content-left" data-aos="fade-left">
          <img src={webDevImage} alt="Web Development" className="home-image" />
        </div>
      </div>

      <div className="content-block reverse">
        <div className="image-content-right" data-aos="fade-right">
          <img src={cyberSecImage} alt="Cybersecurity" className="home-image" />
        </div>
        <div className="text-content" data-aos="fade-left">
          <h2>Fortify Your Digital Fortress</h2>
          <p>Shield your business from cyber threats with our robust cybersecurity solutions. Our expert team provides cutting-edge protection through comprehensive assessments, penetration testing, and tailored strategies. Safeguard your valuable data and systems with our unwavering commitment to digital security.</p>          
          <div className="home-button" data-aos="fade-up" onClick={() => handleShow('Fortify Your Digital Fortress', 'Fortify your digital fortress with TEYORAs impenetrable cybersecurity solutions. Our expert team leverages cutting-edge technology to shield your business from the ever-evolving landscape of cyber threats. From comprehensive assessments to tailored strategies, we provide unparalleled protection for your valuable data and systems. Experience the peace of mind that comes with knowing your digital assets are safeguarded by TEYORAs unwavering commitment to security.')}>
            <span>Read More</span>
          </div>
        </div>
      </div>

      <div className="content-block">
        <div className="text-content" data-aos="fade-right">
          <h2>Elevate Your Brand with Expert Social Media Management</h2>
          <p>Unleash the power of social media with our expert management services. We craft compelling content, build engaged communities, and drive real results for your brand. Let us handle the digital noise while you focus on what you do best.</p>          
          <div className="home-button" data-aos="fade-up" onClick={() => handleShow('Elevate Your Brand', 'Elevate your brands online presence with TEYORA expert social media management. Our team crafts captivating content, fosters vibrant online communities, and drives meaningful engagement. Let us navigate the digital landscape while you focus on core business activities. Experience the power of social media, amplified by TEYORAs expertise.')}>
            <span>Read More</span>
          </div>
        </div>
        <div className="image-content-left" data-aos="fade-left">
          <img src={SocialMedia} alt="Social Media Management" className="home-image" />
        </div>
      </div>

      <div className="content-block reverse">
        <div className="image-content-right" data-aos="fade-right">
          <img src={Networking} alt="Networking" className="home-image" />
        </div>
        <div className="text-content" data-aos="fade-left">
          <h2>Expand Your Network, Enhance Your Business</h2>
          <p>Build strong connections and drive business growth with our comprehensive networking services. We'll help you identify key industry players, create meaningful relationships, and convert opportunities into long-lasting partnerships. Let us expand your professional network while you focus on core business activities.</p>
          <div className="home-button" data-aos="fade-up" onClick={() => handleShow('Expand Your Network', 'Expand your professional horizons and unlock new business opportunities with TEYORAs strategic networking services. Our team connects you with key industry players, fosters meaningful relationships, and helps you convert connections into valuable partnerships. Let us expand your network while you focus on core business activities. Experience the power of strategic networking with TEYORA.')}>
            <span>Read More</span>
          </div>
        </div>
      </div>

      <div className="content-block">
        <div className="text-content" data-aos="fade-right">
          <h2>Seamless Integration, Maximum Impact</h2>
          <p> Optimize your business operations with our expert IA integration services. We seamlessly connect your systems and data, improving efficiency, accuracy, and decision-making. Let us streamline your workflows and unlock the full potential of your business through intelligent automation.</p>
          <div className="home-button" data-aos="fade-up" onClick={() => handleShow('Seamless Integration', 'Unlock the full potential of your business with TEYORAs expert AI integration services. Our cutting-edge solutions seamlessly connect your systems and data, streamlining workflows and optimizing operations. Experience enhanced efficiency, improved accuracy, and data-driven decision-making. Let TEYORAs AI expertise elevate your business to new heights.')}>
            <span>Read More</span>
          </div>
        </div>
        <div className="image-content-left" data-aos="fade-left">
          <img src={AIimage} alt="AI Integration" className="home-image" />
        </div>
      </div>

      {/* Modal Popup */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalContent.text}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" href="/get-started">
            Get Start
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
      <>
      <Testimonials/>
      <Portfolio />
      <Team/>
      <Contact />
      <DownloadableResources clickedButtons={clickedButtons} id='Explore'/>
      <Subscription clickedButtons={clickedButtons} setClickedButtons={setClickedButtons}/>
      </>
      <footer >
        <Footer />
        <Popup />
      </footer>
    </div>
  );
};

export default Home;
