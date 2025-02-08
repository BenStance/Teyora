import React, { useState } from 'react';
import '../assets/styles/Home.css'; // Use Home.css for styling

const Subscription = () => {
  const [email, setEmail] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [policyAgreed, setPolicyAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTermsChange = () => {
    setTermsAgreed(!termsAgreed);
  };

  const handlePolicyChange = () => {
    setPolicyAgreed(!policyAgreed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both checkboxes are checked
    if (!termsAgreed || !policyAgreed) {
      setErrorMessage('You must agree to both the Terms of Use and Policy.');
      return;
    }

    // Reset messages
    setErrorMessage('');
    setSuccessMessage('');

    // Prepare the data to send
    const subscriptionData = { email };

    try {
      const response = await fetch('http://localhost:5000/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message);
        setEmail('');  // Clear email input after successful subscription
      } else {
        const result = await response.json();
        setErrorMessage(result.message || 'Failed to subscribe.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <section className="subscription-section" id="subscription-section">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6 subscription-text">
            <h2 className="subscription-title"><b>
              Never Miss TEYORA Technology Articles and Innovations
            </b></h2>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="subscription-form">
              <div className="subscription-input-container">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className="subscription-input"
                  required
                />
                <button
                  type="submit"
                  className="subscription-button"
                  disabled={!termsAgreed || !policyAgreed}  // Disable if checkboxes not checked
                >
                  Subscribe
                </button>
              </div>
              <div className="subscription-checkboxes">
                <label className="subscription-checkbox">
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={handleTermsChange}
                  />
                  I agree to TEYORA <a href='/Terms'> Terms of Use </a>
                </label>
                <label className="subscription-checkbox">
                  <input
                    type="checkbox"
                    checked={policyAgreed}
                    onChange={handlePolicyChange}
                  />
                  I agree to TEYORA <a href='/policy'> Policy </a>
                </label>
              </div>

              {/* Error or success message display */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
