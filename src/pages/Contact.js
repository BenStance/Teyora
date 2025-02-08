import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaWhatsapp, FaStar } from 'react-icons/fa';
import '../assets/styles/Home.css';

const Contact = () => {
  const [rating, setRating] = useState(0);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    setShowRatingPopup(true); // Show rating popup first
  };

  const handleRatingChange = (star) => {
    setRating(star);
  };

  const handleRatingSubmit = async () => {
    // Now submit the form data after rating
    const dataToSend = {
      ...formData,
      rating: rating,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      if (response.ok) {
        handleShow('Success', result.message);
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form data
        setRating(0); // Reset rating
      } else {
        handleShow('Error', result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      handleShow('Error', 'An error occurred while sending your message.');
    } finally {
      setShowRatingPopup(false); // Close rating popup after submission
    }
  };

  const handleShow = (title, text) => {
    setModalContent({ title, text });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <section className="contact-section" id='contact'>
      <h2 className="section-title">Contact Us</h2>
      
      <form className="contact-form" onSubmit={handleSendMessage}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleInputChange} required></textarea>
        </div>
        
        <button type="submit" className="contact-btn">
          Send Message
        </button>
      </form>

      {/* Social Media Icons */}
      <div className="social-media">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaFacebookF />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaTwitter />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaLinkedinIn />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaInstagram />
        </a>
        <a href={`https://wa.me/${+255622472600}`} target="_blank" rel="noopener noreferrer" className="social-icon">
          <FaWhatsapp />
        </a>
      </div>

      {/* Rating Popup */}
      {showRatingPopup && (
        <div className="rating-popup">
          <h3>Rate Your Experience</h3>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`rating-star ${star <= rating ? 'active' : ''}`}
                onClick={() => handleRatingChange(star)}
              >
                <FaStar />
              </span>
            ))}
          </div>
          <button onClick={handleRatingSubmit} className="rating-btn">
            Submit Rating
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal show={showModal} onClose={handleClose} title={modalContent.title} text={modalContent.text} />
    </section>
  );
};

// Modal Component
const Modal = ({ show, onClose, title, text }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{text}</p>
        <button onClick={onClose} className="signin-button3">Close</button>

      </div>
    </div>
  );
};

export default Contact; 
