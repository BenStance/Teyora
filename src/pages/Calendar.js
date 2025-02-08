import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button, Modal, Form, Row, Col, Card } from 'react-bootstrap';
import { FaClipboardList } from 'react-icons/fa';
import '../assets/styles/Calendar.css';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);  // Load activities from DB
  const [newActivity, setNewActivity] = useState({ title: '', description: '' });

  // Fetch activities from the server
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:5000/activities', {
          method: 'GET',
          credentials: 'include',  // Include cookies for session authentication
        });

        if (response.ok) {
          const data = await response.json();
          setActivities(data.activities);  // Set fetched activities to state
        } else {
          console.error('Failed to load activities');
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  // Handle date change in the calendar
  const handleDateChange = (newDate) => {
    setDate(newDate);
    const formattedDate = newDate.toISOString().split('T')[0];
    const activity = activities.find((activity) => activity.date === formattedDate);
    if (activity) {
      setSelectedActivity(activity);
      setShowModal(true);
    } else {
      setSelectedActivity(null);
      setShowAddModal(true);
    }
  };

  // Handle adding a new activity
  const handleAddActivity = async () => {
    const formattedDate = date.toISOString().split('T')[0];
    const activityData = {
      date: formattedDate,
      title: newActivity.title,
      description: newActivity.description,
    };

    try {
      const response = await fetch('http://localhost:5000/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Include cookies for session authentication
        body: JSON.stringify(activityData),
      });

      if (response.ok) {
        setActivities([...activities, { ...activityData, id: response.id }]); // Assume ID is returned from the server
        setShowAddModal(false);
        setNewActivity({ title: '', description: '' });
      } else {
        console.error('Failed to add activity');
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  // Handle deleting an activity
  const handleDelete = async () => {
    if (!selectedActivity) return; // Prevent errors if no activity is selected
    try {
      const response = await fetch(`http://localhost:5000/activities/${selectedActivity.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Remove the activity from state
        setActivities(activities.filter((activity) => activity.id !== selectedActivity.id));
        setShowModal(false);
        setSelectedActivity(null); // Clear selected activity after deletion
      } else {
        console.error('Failed to delete activity');
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  // Filter recent activities for display
  const recentActivities = activities.filter((activity) => {
    return new Date(activity.date) >= new Date();
  });

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Admin Activity Calendar</h2>
      <Calendar onChange={handleDateChange} value={date} className="react-calendar" />

      {/* Modal for viewing activity */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedActivity ? selectedActivity.title : 'No Activity'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedActivity ? selectedActivity.description : 'No activity set for this date.'}
        </Modal.Body>
        <Modal.Footer>
          {selectedActivity && (
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for adding new activity */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="activityTitle">
              <Form.Label>Activity Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter activity title"
                value={newActivity.title}
                onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="activityDescription">
              <Form.Label>Activity Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter activity description"
                value={newActivity.description}
                onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddActivity}>
            Save Activity
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Recent Activities Section */}
      <Row className="activities-section">
        <Col md={12}>
          <Card className="activities-card">
            <h4>Recent Activities</h4>
            <ul className="activities-list">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <li key={index}>
                    <FaClipboardList /> {activity.title}: {activity.description} (on {activity.date})
                  </li>
                ))
              ) : (
                <p>No recent activities.</p>
              )}
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CalendarPage;
