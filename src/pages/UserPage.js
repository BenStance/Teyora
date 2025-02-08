import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Row, Carousel } from 'react-bootstrap';
import {  FaWhatsapp } from 'react-icons/fa';
import '../assets/styles/UserPage.css';
import Subscription from './Subscription';
import Footer from './Footer2';
import image1 from "../assets/images/pict1.jpg";
import image2 from "../assets/images/pict4.jpg";
import image3 from "../assets/images/pict6.jpg";
import { useNavigate } from 'react-router-dom';
import Contact from './Contact';

const UserPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');  // State to store the username

    useEffect(() => {
        // Function to fetch the username from the server
        const fetchUsername = async () => {
            try {
                const response = await fetch('http://localhost:5000/user-info', {
                    method: 'GET',
                    credentials: 'include', // Include cookies for session management
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setUsername(data.username);  // Set the username state
                } else if (response.status === 401) {
                    navigate('/login'); // If unauthorized, redirect to login
                } else {
                    console.error('Failed to fetch username');
                }
            } catch (error) {
                console.error('Error fetching username:', error);
                navigate('/login'); // Redirect to login on error
            }
        };

        // Check if the user is still authenticated
        const checkSession = async () => {
            try {
                const response = await fetch('http://localhost:5000/user', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.status === 401) {
                    navigate('/login'); // Redirect to login if unauthorized
                } else {
                    // If authenticated, fetch the username
                    fetchUsername();
                }
            } catch (error) {
                console.error('Error checking session:', error);
                navigate('/login'); // Redirect to login on error
            }
        };

        checkSession();
    }, [navigate]);

    const [selectedService, setSelectedService] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const serviceOptions = {
        'Web Development': ['AI Integrated', 'Blockchain Site', 'Web Semantics', 'Web 2.0', 'ICP', 'E-commerce Solutions'],
        'Networking': ['Network Setup', 'Wi-Fi Installation', 'Cybersecurity Consulting', 'VPN Configuration'],
        'Computer and Mobile Maintenance': ['PC Repair', 'Mobile Troubleshooting', 'Hardware Upgrade', 'Software Installation'],
        'Poster Design': ['Event Posters', 'Digital Marketing Banners', 'Flyers'],
        'Blog Writing': ['SEO-Optimized Articles', 'Technical Writing', 'Personal Blogs'],
        'Cloud Computing Services': ['AWS Setup', 'Google Cloud Solutions', 'Azure Management'],
        'Penetration Testing': ['Website Security', 'Mobile App Testing', 'Network Penetration Testing', 'Vulnerability Assessment', 'Enumeration']
    };

    const handleServiceChange = (e) => {
        setSelectedService(e.target.value);
        setSelectedOption(''); // Reset option on new service selection
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
//     // const [clickedButtons, setClickedButtons] = useState([]);
// const [showRatingPopup, setShowRatingPopup] = useState(false);
// const [rating, setRating] = useState(0);

// // Handle form submission
// const handleSendMessage = (e) => {
//   e.preventDefault(); // Prevent default form submission

//   // Simulate form submission (replace with your actual form submission logic)
//   console.log('Form submitted!');

//   // Show rating popup after successful submission
//   setShowRatingPopup(true);
// };

// // Handle star rating selection
// const handleRatingChange = (newRating) => {
//   setRating(newRating);
// };

// // Handle rating submission and form data sending
// const handleRatingSubmit = () => {
//   // Simulate sending rating and form data to the server
//   console.log(`Rating submitted: ${rating} stars`);

//   // Simulate sending form data (you can replace this with actual form submission logic)
//   sendFormDataAndRating();

//   // Close rating popup and refresh page
//   setShowRatingPopup(false);

//   // Refresh the page after a small delay to allow the user to see the confirmation
//   setTimeout(() => {
//     window.location.reload(); // Refresh the page
//   }, 500);
// };
// const sendFormDataAndRating = () => {
//     // Here, you can send the form data and rating to your server
//     console.log('Form data and rating sent to the server!');
//   };

    return (
        <div className="home-container" id='home-container'>
            <Carousel className="carousel-background">
                <Carousel.Item>
                    <div className="overlay"></div>
                    <img className="d-block w-100" src={image1} alt="First slide" />
                    <div className="carousel-caption">
                        <h3 className="tagline">Innovating the Future of Digital Solutions</h3>
                        <Button className="home-button2">Get Started</Button>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="overlay"></div>
                    <img className="d-block w-100" src={image2} alt="Second slide" />
                    <div className="carousel-caption">
                        <h3 className="tagline">Empowering Your Digital Journey</h3>
                        <Button className="home-button2">Contact Us</Button>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="overlay"></div>
                    <img className="d-block w-100" src={image3} alt="Third slide" />
                    <div className="carousel-caption">
                        <h3 className="tagline">Building Tomorrow's Technology Today</h3>
                        <Button className="home-button2">Learn More</Button>
                    </div>
                </Carousel.Item>
            </Carousel>

            <div className="userpage-container">
                {/* Navigation bar placeholder */}
                <div className="navbar-placeholder"></div>

                {/* Welcome Section */}
                <section className="welcome-section text-center py-5" id="learn-more">
                    <Container>
                        <h1 className="display-4">Welcome, {username}!</h1> {/* Display username here */}
                        <p className="lead">Choose the services you need, and we’ll get back to you with solutions tailored just for you.</p>
                    </Container>
                </section>

                {/* Service Selection Section */}
                <section className="service-selection-section py-5">
                    <Container>
                        <Row>
                            <Col md={12} className="text-center">
                                <h2>Select the Service You Need</h2>
                            </Col>
                            <Col md={6} className="mx-auto">
                                <Form.Group controlId="serviceSelect">
                                    <Form.Label>Select a Service</Form.Label>
                                    <Form.Control as="select" value={selectedService} onChange={handleServiceChange}>
                                        <option value="">-- Select Service --</option>
                                        {Object.keys(serviceOptions).map((service, idx) => (
                                            <option key={idx} value={service}>{service}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Second Section (Options based on Service) */}
                        {selectedService && (
                            <Row className="mt-4">
                                <Col md={12} className="text-center">
                                    <h3>Available Options for {selectedService}</h3>
                                </Col>
                                <Col md={6} className="mx-auto">
                                    <Form.Group controlId="optionSelect">
                                        <Form.Label>Select an Option</Form.Label>
                                        <Form.Control as="select" value={selectedOption} onChange={handleOptionChange}>
                                            <option value="">-- Select Option --</option>
                                            {serviceOptions[selectedService].map((option, idx) => (
                                                <option key={idx} value={option}>{option}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        )}
                    </Container>
                </section>

                {/* Requirement Submission Section */}
                {selectedOption && (
                    <section className="requirement-section py-5 bg-light">
                        <Container>
                            <Row>
                                <Col md={12} className="text-center">
                                    <h3>Let Us Know Your Specific Requirements</h3>
                                    <p>We’ll tailor our services based on your needs. Click the button below to send us your requirements via WhatsApp.</p>
                                </Col>
                                <Col md={6} className="mx-auto text-center">
                                    <Card className="requirement-card p-4">
                                        <p>Service: {selectedService}</p>
                                        <p>Option: {selectedOption}</p>
                                        <Button
                                            variant="success"
                                            className="whatsapp-btn"
                                            href={`https://wa.me/255622472600?text=Hello,%20I%20am%20interested%20in%20${encodeURIComponent(selectedService)}%20with%20the%20option%20of%20${encodeURIComponent(selectedOption)}.%20Here%20are%20my%20requirements:`}
                                            target="_blank"
                                        >
                                            <FaWhatsapp /> Send Requirements via WhatsApp
                                        </Button>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                )}

                {/* Add any other sections you think might be important */}
                <section className="additional-section py-5">
                    <Container>
                        <Row>
                            <Col md={12} className="text-center">
                                <h2>Why Choose Us?</h2>
                                <p className="lead">We offer the most advanced solutions tailored for your business, from AI integration to advanced security measures.</p>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <>
                    <Contact />
                    <Subscription id="subscription" />
                    <Footer />
                </>
            </div>
        </div>
    );
};

export default UserPage;
