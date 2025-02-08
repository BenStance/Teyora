import React, { useState, useEffect } from "react";
import  {Container}  from "react-bootstrap";
import "../assets/styles/popup.css"; // Import custom CSS for additional styles

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setShowPopup(true); // Show the pop-up when the user reaches the bottom
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    setShowPopup(false); // Hide the pop-up when 'X' is clicked
  };

  return (
    showPopup && (
      <Container
        fluid
        className="popup-container d-flex justify-content-between align-items-center fade-up"
      >
        <h1 className="popup-title">Are you ready to expand your business with  TEYORA technology ?</h1>
        <a href="./get-started">
          <div className="button">Start Now</div>
        </a>
        <span className="close-btn" onClick={handleClose}>
          X
        </span>
      </Container>
    )
  );
};

export default Popup;
