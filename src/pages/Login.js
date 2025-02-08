import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import '../assets/styles/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import teyoraLogo from '../assets/images/logo bg.png'; // Add your logo path here
import pic1 from '../assets/images/pict1.jpg';
import pic2 from '../assets/images/pict2.jpg';
import pic3 from '../assets/images/pict3.jpg';
import pic4 from '../assets/images/pict4.jpg';
import pic5 from '../assets/images/pict5.jpg';
import pic6 from '../assets/images/pict6.jpg';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Carousel } from 'react-bootstrap';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate for redirection

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error
    setSuccess(''); // Reset success message

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',  // Important for handling cookies/sessions
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful! Redirecting...');
        
        // Redirect based on the role provided by the backend
        setTimeout(() => {
          navigate(data.redirect);  // Use navigate to programmatically redirect
        }, 1000);  // Delay for showing success message

      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='p-10 h-screen flex items-center justify-center wrapperbg'>
      <section className="container-fluid flex flex-col md:flex-row items-center p-7 rounded-lg shadow-lg max-w-4xl w-full wrapperbg2">
        <div className="w-full md:w-3/5 h-full">
          <div className="backpic">
            <div className="backpic-content">
              <Carousel>
                <Carousel.Item>
                  <img className="d-block w-100 carousel-image" src={pic1} alt="First slide" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100 carousel-image" src={pic2} alt="Second slide" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100 carousel-image" src={pic3} alt="Third slide" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100 carousel-image" src={pic4} alt="Fourth slide" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100 carousel-image" src={pic5} alt="Fifth slide" />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100 carousel-image" src={pic6} alt="Sixth slide" />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 h-full px-6 lg:px-16 xl:px-12 flex items-center justify-center form-width">
          <div className="w-full h-100">
            <div className="flex justify-center mb-6">
              <a href="/">
                <img src={teyoraLogo} alt="Teyora Logo" className="w-32" />
              </a>
            </div>
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" /> {/* Email icon */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="input-field pl-10"
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative mt-4">
                <FaLock className="absolute top-3 left-3 text-gray-400" /> {/* Password icon */}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input-field pl-10"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              {success && <p className="text-green-500 text-center">{success}</p>}
              <button type="submit" className="btn-primary mt-6 w-full">Log In</button>
              <div className="flex items-center justify-center my-4">
                <span className="line"></span>
                <span className="mx-4 text-gray-500">or use google</span>
                <span className="line"></span>
              </div>
              <button type="button" className="btn-google2 mt-4 w-full">
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 48 48">
                    <defs>
                      <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                    </defs>
                    <clipPath id="b"><use href="#a" overflow="visible" /></clipPath>
                    <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/>
                    <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/>
                    <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/>
                    <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/>
                  </svg>
                  <span className="ml-4">Log in with Google</span>
                </div>
              </button>
              <div className="login-footer mt-6 flex flex-col md:flex-row items-center justify-center text-center md:text-left">
                <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
                <span className="divider hidden md:inline-block mx-2">|</span>
                <a href="/register" className="register-link mt-2 md:mt-0">Create an Account</a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;