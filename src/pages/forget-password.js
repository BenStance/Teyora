import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/login.css';

const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [timer, setTimer] = useState(180); // 60-second OTP countdown
  const navigate = useNavigate();

  // Countdown for OTP timer
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [step, timer]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/forgot-password/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        setSuccessMessage('OTP sent to your email!');
        setStep(2);
      } else {
        setErrorMessage('Failed to send OTP. Please check your email.');
      }
    } catch (error) {
      setErrorMessage('Error requesting OTP. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/forgot-password/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      if (response.ok) {
        setSuccessMessage('OTP verified! Please enter your new password.');
        setStep(3);
      } else {
        setErrorMessage('Invalid or expired OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error verifying OTP. Please try again.');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/forgot-password/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });
      if (response.ok) {
        setSuccessMessage('Password reset successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setErrorMessage('Failed to reset password. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form">
        <h1 className="forgot-password-title">Forgot Password</h1>
        {errorMessage && <div className="forgot-password-error">{errorMessage}</div>}
        {successMessage && <div className="forgot-password-success">{successMessage}</div>}

        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <div className="forgot-password-input-container">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="forgot-password-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="forgot-password-btn-primary">Request OTP</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <div className="forgot-password-input-container">
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                className="forgot-password-input"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="forgot-password-timer">Time remaining: {timer} seconds</div>
            <button type="submit" className="forgot-password-btn-primary">Verify OTP</button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordReset}>
            <div className="forgot-password-input-container">
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                className="forgot-password-input"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="forgot-password-input-container">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="forgot-password-input"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="forgot-password-btn-primary">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
