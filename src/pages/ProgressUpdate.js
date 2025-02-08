import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

function UpdateProgressForm() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [newProgress, setNewProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Fetch the list of users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched users:", data); // Log data to check
        setUsers(data.users || []); // Ensure it's an array
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Error fetching users, please try again later.');
      } finally {
        setLoadingUsers(false); // Set loading to false
      }
    };

    fetchUsers();
  }, []);

  // Fetch the projects for the selected user
  useEffect(() => {
    if (selectedUser) {
      setLoadingProjects(true);
      const fetchProjects = async () => {
        try {
          const response = await fetch(`http://localhost:5000/user/${selectedUser}/projects`, {
            method: 'GET',
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.status}`);
          }

          const data = await response.json();
          console.log("Fetched projects:", data); // Log data to check
          setProjects(data.projects || []); // Ensure it's an array
        } catch (error) {
          console.error('Failed to fetch projects:', error);
          setError('Error fetching projects, please try again later.');
        } finally {
          setLoadingProjects(false); // Set loading to false
        }
      };

      fetchProjects();
    }
  }, [selectedUser]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!selectedUser || !selectedProject || newProgress === '') {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/user/${selectedUser}/update-progress`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: selectedProject,
          progress: newProgress,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Progress successfully updated!');
        setSelectedProject('');
        setNewProgress(0);
        setError('');
      } else {
        setError(data.message || 'Failed to update progress.');
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      setError('An error occurred while updating progress.');
    }
  };

  return (
    <Row className="update-progress-section mt-5">
      <Col>
        <h4>Update Project Progress</h4>
        <Form onSubmit={handleUpdateSubmit}>
          <Form.Group controlId="selectClient">
            <Form.Label>Select Client</Form.Label>
            {loadingUsers ? (
              <p>Loading users...</p>
            ) : (
              <Form.Control
                as="select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                required
              >
                <option value="">-- Select Client --</option>
                {users.length > 0 ? (
                  users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))
                ) : (
                  <option value="">No users found</option>
                )}
              </Form.Control>
            )}
          </Form.Group>

          <Form.Group controlId="selectProject" className="mt-3">
            <Form.Label>Select Project</Form.Label>
            {loadingProjects ? (
              <p>Loading projects...</p>
            ) : (
              <Form.Control
                as="select"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                required
              >
                <option value="">-- Select Project --</option>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))
                ) : (
                  <option value="">No projects found</option>
                )}
              </Form.Control>
            )}
          </Form.Group>

          <Form.Group controlId="progressPercentage" className="mt-3">
            <Form.Label>Update Progress Percentage</Form.Label>
            <Form.Control
              type="number"
              value={newProgress}
              onChange={(e) => setNewProgress(e.target.value)}
              placeholder="Enter new progress percentage"
              required
              min="0"
              max="100"
            />
          </Form.Group>

          <Button type="submit" className="mt-3" variant="primary">
            Update Progress
          </Button>

          {successMessage && <Alert className="mt-3" variant="success">{successMessage}</Alert>}
          {error && <Alert className="mt-3" variant="danger">{error}</Alert>}
        </Form>
      </Col>
    </Row>
  );
}

export default UpdateProgressForm;
