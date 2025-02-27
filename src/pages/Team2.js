import React from 'react';
import '../assets/styles/Team2.css'; // Updated CSS import
import { Card, Row, Col } from 'react-bootstrap';

// Team member data
const teamMembers = [
  {
    name: 'Mathias Macheyeke',
    position: 'Chief Executive Officer (CEO)',
    description: 'As CEO, Mathias provides strategic leadership and oversees all aspects of the company. He is responsible for setting the company\'s vision, mission, and overall direction.',
    image: require('../assets/images/matt.png'),
  },
  {
    name: 'Shukuruni Sanga',
    position: 'Chief Operating Officer (COO)',
    description: 'Shukuru, as our COO, is responsible for the day-to-day operations of the company. He ensures that our business runs smoothly and efficiently.',
    image: require('../assets/images/Shukuru.png'),
  },
  {
    name: 'Benedict Nsale',
    position: 'Chief Technology Officer (CTO)',
    description: 'Benedict leads our technology team and is responsible for driving innovation and ensuring the successful delivery of our technical projects.',
    image: require('../assets/images/benstance.png'),
  },
];

const Team = () => {
  return (
    <div className="team-wrapper">
      <h2 className="team-title" data-aos="fade-up">Meet the Team</h2>
      <Row className="team-cards-container mt-5" data-aos="fade-up">
        {teamMembers.map((member, index) => (
          <Col md={4} sm={6} xs={12} key={index} className="team-card-column mb-4">
            <Card className="team-card-box">
              <div className="team-card-image-wrapper">
                <Card.Img variant="top" src={member.image} className="team-card-image" />
              </div>
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Subtitle className="team-card-subtitle mb-2 text-muted">{member.position}</Card.Subtitle>
                <Card.Text>{member.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Team;
