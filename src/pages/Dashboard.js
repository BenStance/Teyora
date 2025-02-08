import React, { useState, useEffect } from 'react';
import { FaUser, FaChartLine, FaProjectDiagram, FaBell, FaBug, FaUserCheck, FaTrashAlt, FaUserPlus } from 'react-icons/fa';
import { Button, Card, Row, Col, ProgressBar, Table, Form, Alert, ListGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import CalendarComponent from './Calendar';
import '../assets/styles/Dashboard.css';
import MessagesList from './MessageList';
// import UpdateProgressForm from './ProgressUpdate';

const Dashboard = () => {
  const navigate = useNavigate();
  const [performance, setPerformance] = useState(0);  // State for performance value
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState('');  // New state for selected client
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [subscribedEmails, setSubscribedEmails] = useState([]);  // State to hold subscribed emails


  // Fetch performance data
  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const response = await fetch('http://localhost:5000/performance', {
          credentials: 'include',  // Include credentials for session management
        });
        const data = await response.json();
        if (response.ok) {
          setPerformance(data.performance);
        } else {
          console.error('Failed to fetch performance data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };
    fetchPerformance();
  }, []);

  // Check session and redirect if not authenticated
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:5000/user', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.status === 401) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        navigate('/login');
      }
    };
    checkSession();
  }, [navigate]);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await fetch('http://localhost:5000/users', {
          method: 'GET',
          credentials: 'include',
        });

        const usersData = await usersResponse.json();
        if (usersResponse.ok) {
          setUsers(usersData);
        } else {
          setError(usersData.message || 'Failed to fetch users');
        }
      } catch (error) {
        setError('An error occurred while fetching data.');
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
        setError('');
      } else {
        setError(data.message || 'Failed to delete user');
      }
    } catch (error) {
      setError('An error occurred while deleting the user.');
      console.error('Error deleting user:', error);
    }
  };

  // Handle promote user
  const handlePromoteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${userId}/promote`, {
        method: 'PUT',
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(users.map((user) => (user.id === userId ? { ...user, is_admin: true } : user)));
        setError('');
      } else {
        setError(data.message || 'Failed to promote user');
      }
    } catch (error) {
      setError('An error occurred while promoting the user.');
      console.error('Error promoting user:', error);
    }
  };

  // Handle project progress submission
  const handleProgressSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedUser || !projectTitle || !projectDescription || !progressPercentage) {
      setError('Please fill in all fields.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/user/${selectedUser}/post-progress`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: projectTitle,
          description: projectDescription,
          progress: progressPercentage,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccessMessage('Progress successfully posted!');
        setProjectTitle('');
        setProjectDescription('');
        setProgressPercentage(0);
        setError('');
      } else {
        setError(data.message || 'Failed to post progress.');
      }
    } catch (error) {
      setError('An error occurred while posting progress.');
      console.error('Error posting progress:', error);
    }
  };
  const [projectCount, setProjectCount] = useState(0);  // State to hold the number of projects
  // const [error, setError] = useState('');  // State to handle errors

  // Fetch the total number of projects from the server
  useEffect(() => {
      const fetchProjectCount = async () => {
          try {
              const response = await fetch('http://localhost:5000/projects/count', {
                  method: 'GET',
                  credentials: 'include',  // Ensure session-based authentication
              });

              if (response.ok) {
                  const data = await response.json();
                  setProjectCount(data.count);  // Set the project count in state
              } else {
                  setError('Failed to load project count');
              }
          } catch (error) {
              console.error('Error fetching project count:', error);
              setError('Error fetching project count');
          }
      };

      fetchProjectCount();
  }, []);  // Empty dependency array means this runs once on component mount

  const [activityCount, setActivityCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        // Function to fetch activity count
        const fetchActivityCount = async () => {
            try {
                const response = await fetch('http://localhost:5000/activities/count', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setActivityCount(data.count); // Update the state with the activity count
            } catch (err) {
                setError(err.message);
                console.error(err);
            }
        };

        // Function to fetch message count
        const fetchMessageCount = async () => {
            try {
                const response = await fetch('http://localhost:5000/admin/messages/count', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setMessageCount(data.count); // Update the state with the message count
            } catch (err) {
                setError(err.message);
                console.error(err);
            }
        };

        // Call both fetch functions
        fetchActivityCount();
        fetchMessageCount();
    }, []);

    // Fetch subscribed emails from the server
  useEffect(() => {
    const fetchSubscribedEmails = async () => {
      try {
        const response = await fetch('http://localhost:5000/subscriptions', {
          method: 'GET',
          credentials: 'include',  // Include cookies for session-based auth
        });

        if (response.ok) {
          const data = await response.json();
          setSubscribedEmails(data.subscribers);  // Set emails in state
        } else {
          setError('Failed to fetch subscribed emails');
        }
      } catch (error) {
        console.error('Error fetching subscribed emails:', error);
        setError('Error fetching subscribed emails');
      }
    };

    fetchSubscribedEmails();
  }, []);
  const [subscriptionCount, setSubscriptionCount] = useState(0);  // State to hold subscription count
// Fetch subscription count from the server
useEffect(() => {
  const fetchSubscriptionCount = async () => {
    try {
      const response = await fetch('http://localhost:5000/subscriptions/count', {
        method: 'GET',
        credentials: 'include',  // Include cookies for session-based auth
      });

      if (response.ok) {
        const data = await response.json();
        setSubscriptionCount(data.count);  // Set the subscription count in state
      } else {
        setError('Failed to fetch subscription count');
      }
    } catch (error) {
      console.error('Error fetching subscription count:', error);
      setError('Error fetching subscription count');
    }
  };

  fetchSubscriptionCount();
}, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <p>Monitor and manage your activities here.</p>
      </div>

      {/* Stats Overview */}
      <div>
      <Row className="dashboard-overview">
        <Col md={4}>
          <Card className="overview-card">
            <FaUser className="icon" />
            <h4>Total Users</h4>
            <p>{users.length} Active Users</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="overview-card">
            <FaProjectDiagram className="icon" />
              <h4>TEYORA Projects</h4>
              {/* Dynamically display the number of projects */}
              <p>{projectCount} Projects</p>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="overview-card">
            <FaChartLine className="icon" />
            <h4>Performance</h4>
            <ProgressBar now={performance} label={`${performance}%`} className="performance-bar" />
          </Card>
        </Col>
      </Row>

      <Row className="dashboard-overview">
        <Col md={4}>
                <Card className="overview-card">
                    <FaBell className="icon" />
                    <h4>Notifications</h4>
                    <p>{messageCount + activityCount} New Alerts</p> {/* Update to show counts */}
                </Card>
            </Col>
        <Col md={4}>
          <Card className="overview-card">
            <FaBug className="icon" />
            <h4>System Penetration Report</h4>
            <p>Latest Security Reports Available</p>
          </Card>
        </Col>
        {/* Subscribed Users Card */}
      <Col md={4}>
        <Card className="overview-card">
          <FaUserCheck className="icon" />
          <h4>Subscribed Users</h4>
          <p>{subscriptionCount} clients have Subscribed</p>
        </Card>
      </Col>

      {/* Handle any error messages */}
      {error && <p className="error-message">{error}</p>}
      </Row>
      {error && <p className="error-message">{error}</p>}
      </div>
      <CalendarComponent />

      {/* User Management Section */}
      <Row className="user-management-section">
        <Col>
          <h4>User Management</h4>
          {error && <p className="text-danger">{error}</p>}
          <Table striped bordered hover responsive className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td data-label="ID">{user.id}</td>
                  <td data-label="Username">{user.username}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Role">{user.is_admin ? 'Admin' : 'User'}</td>
                  <td data-label="Actions" className="butt-flex">
                    <Button className="me-2" onClick={() => handleDeleteUser(user.id)}>
                      <FaTrashAlt /> Delete
                    </Button>
                    {!user.is_admin && (
                      <Button className="me-2" onClick={() => handlePromoteUser(user.id)}>
                        <FaUserPlus /> Promote to Admin
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      
      {/* Post Project Progress Section */}
      <Row className="post-progress-section">
        <Col>
          <h4>Post Project Progress</h4>
          <Form onSubmit={handleProgressSubmit}>
            <Form.Group controlId="selectClient">
              <Form.Label>Select Client</Form.Label>
              <Form.Control
                as="select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                required
              >
                <option value="">-- Select Client --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="projectTitle" className="mt-3">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Enter project title"
                required
              />
            </Form.Group>

            <Form.Group controlId="projectDescription" className="mt-3">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={4}
                placeholder="Enter project description"
                required
              />
            </Form.Group>

            <Form.Group controlId="progressPercentage" className="mt-3">
              <Form.Label>Progress Percentage</Form.Label>
              <Form.Control
                type="number"
                value={progressPercentage}
                onChange={(e) => setProgressPercentage(e.target.value)}
                placeholder="Enter progress percentage"
                required
                min="0"
                max="100"
              />
            </Form.Group>

            <Button type="submit" className="mt-3" variant="success">
              Post Progress
            </Button>

            {successMessage && <Alert className="mt-3" variant="success">{successMessage}</Alert>}
          </Form>
        </Col>
      </Row>

      {/* <UpdateProgressForm /> */}

      <MessagesList />
      <div className="dashboard">
      {/* Other sections of your dashboard */}

      {/* Subscribed Emails Section */}
      <Row className="mt-4">
        <Col md={12}>
          <Card className="subscribed-emails-card">
            <Card.Header><h4>Subscribed Emails</h4></Card.Header>
            <Card.Body>
              {subscribedEmails.length > 0 ? (
                <ListGroup>
                  {subscribedEmails.map((email, index) => (
                    <ListGroup.Item key={index}>
                      {email}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p>No subscribed emails found.</p>
              )}
              {error && <p className="error-message">{error}</p>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </div>
  

      {/* Call-to-Action Buttons */}
      <div className="cta-buttons buttons"> 
        <Link className="cta-btn btn btn-primary" to="/new_project">
          New Project
        </Link>
        {/* <Button className="cta-btn" variant="outline-secondary">
          Support
        </Button>
        <Button className="cta-btn" variant="info">
          View Analytics
        </Button> */}

      </div>
    </div>
  );
};

export default Dashboard;
