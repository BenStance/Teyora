import React from 'react';
import '../assets/styles/main.css'; // Optional: If you have specific styles for Button

function Button({ onClick, children }) {
    return (
        <button onClick={onClick} className="btn">
            {children}
        </button>
    );
}

export default Button;
