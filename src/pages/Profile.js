import React from 'react';
import '../assets/styles/Profile.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Profile = () => {
  const userInfo = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+123456789',
    location: 'New York, USA',
  };

  return (
    <div className="body-profile">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
        </div>

        <div className="profile-details">
          <div className="profile-item">
            <FaEnvelope />
            <div className="profile-info">
              <label>Email:</label>
              <p>{userInfo.email}</p>
            </div>
          </div>

          <div className="profile-item">
            <FaPhone />
            <div className="profile-info">
              <label>Phone:</label>
              <p>{userInfo.phone}</p>
            </div>
          </div>

          <div className="profile-item">
            <FaMapMarkerAlt />
            <div className="profile-info">
              <label>Location:</label>
              <p>{userInfo.location}</p>
            </div>
          </div>

          <div className="profile-item">
            <label>Name:</label>
            <p>{userInfo.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
