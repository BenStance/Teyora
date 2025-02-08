import React, { useState, useEffect } from 'react';
import '../assets/styles/NewProject.css';  // Importing the CSS file for styling

const NewProject = () => {
    const [users, setUsers] = useState([]);  // Store the list of users (clients)
    const [selectedUserId, setSelectedUserId] = useState('');  // The selected client (user)
    const [projectTitle, setProjectTitle] = useState('');  // Title of the project
    const [projectDescription, setProjectDescription] = useState('');  // Description of the project
    const [message, setMessage] = useState('');  // Response message from the server

    // Fetch the list of users when the component loads
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/users', {
                    method: 'GET',
                    credentials: 'include',  // Ensure session-based authentication is included
                });

                if (response.ok) {
                    const usersData = await response.json();
                    setUsers(usersData);  // Set the list of users
                } else {
                    setMessage('Failed to load users');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setMessage('Error fetching users');
            }
        };

        fetchUsers();
    }, []);

    // Handle form submission to create a new project
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedUserId || !projectTitle || !projectDescription) {
            setMessage('All fields are required');
            return;
        }

        const projectData = {
            user_id: selectedUserId,  // The selected client (user ID)
            title: projectTitle,
            description: projectDescription,
        };

        try {
            const response = await fetch('http://localhost:5000/new-project', {
                method: 'POST',
                credentials: 'include',  // Ensure session-based authentication is included
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(result.message);  // Show success message from backend
                // Optionally clear the form fields after successful submission
                setSelectedUserId('');
                setProjectTitle('');
                setProjectDescription('');
            } else {
                const errorResult = await response.json();
                setMessage(errorResult.message || 'Error creating project');
            }
        } catch (error) {
            console.error('Error submitting project:', error);
            setMessage('Error submitting project');
        }
    };

    return (
        <div className="new-project-container">
            <h2>Register New Project</h2>
            <form onSubmit={handleSubmit} className="new-project-form">
                {/* Select Client */}
                <div className="form-group">
                    <label htmlFor="client">Select Client:</label>
                    <select
                        id="client"
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        required
                    >
                        <option value="">--Select Client--</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.username} ({user.email})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Project Title */}
                <div className="form-group">
                    <label htmlFor="title">Project Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="Enter project title"
                        required
                    />
                </div>

                {/* Project Description */}
                <div className="form-group">
                    <label htmlFor="description">Project Description:</label>
                    <textarea
                        id="description"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="Enter project description"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit">Register Project</button>
            </form>
            
            {/* Message Display */}
            {message && <p className={`response-message ${message.includes('Error') ? 'error' : ''}`}>{message}</p>}
        </div>
    );
};

export default NewProject;
