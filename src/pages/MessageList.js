import React, { useEffect, useState } from 'react';
import '../assets/styles/MessagesList.css'; // Adjust the path as necessary

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch messages from the backend
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/admin/messages');
        const data = await response.json();

        if (response.ok) {
          setMessages(data.messages);
        } else {
          setError('Failed to load messages');
        }
      } catch (err) {
        setError('Error fetching messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/admin/messages/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted message from the state
        setMessages(messages.filter((msg) => msg.id !== id));
      } else {
        setError('Failed to delete the message');
      }
    } catch (err) {
      setError('Error deleting the message');
    }
  };

  if (loading) return <p className="loading">Loading messages...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section className="messages-section">
      <h2 className="messages-title">Admin Dashboard - Messages</h2>
      {messages.length === 0 ? (
        <p className="no-messages">No messages available</p>
      ) : (
        <div className="row messages-list">
          {messages.map((msg) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={msg.id}>
              <div className="message-item">
                <div className="message-header">
                  <h4 className="message-subject">{msg.subject}</h4>
                  <p className="message-date">{msg.created_at}</p>
                </div>
                <div className="message-body">
                  <p><strong>Name:</strong> {msg.name}</p>
                  <p><strong>Email:</strong> {msg.email}</p>
                  <p><strong>Message:</strong> {msg.message}</p>
                  <p className="message-rating"><strong>Rating:</strong> {msg.rating}</p>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(msg.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MessagesList;
