import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import '../assets/styles/UserProgress.css'; // Link to the CSS file

function UserProgress({ userId }) {
  const [progressData, setProgressData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await fetch('http://localhost:5000/user-progress', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
          setProgressData(data.progress);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('Network error:', error);
        setError('Failed to fetch user progress. Please try again later.');
      }
    };

    fetchUserProgress();
  }, []);

  return (
    <Container className="user-progress-container mt-5">
      <div className="progress-header text-center">
        <h1>User Project Progress</h1>
        <p>Check your project updates and progress below</p>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-4">
        {progressData.length > 0 ? (
          progressData.map((project) => (
            <Col md={6} lg={4} key={project.id}>
              <Card className="progress-card shadow-sm">
                <Card.Body>
                  <Card.Title>{project.progress_data.title}</Card.Title>
                  <Card.Text>{project.progress_data.description}</Card.Text>
                  <p className="text-muted">
                    <small>{project.timestamp}</small>
                  </p>

                  {project.progress_data.progress !== undefined && (
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${project.progress_data.progress}%` }}
                        aria-valuenow={project.progress_data.progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {project.progress_data.progress}%
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">No progress found!</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default UserProgress;
