import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { FaSearch, FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // For search and login icons
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/main.css'; // Import custom CSS for Navbar
import logo from '../assets/images/logo.jpg';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

function AppNavbar() {
  const [searchQuery, setSearchQuery] = useState('');  // State to handle search query
  const navigate = useNavigate();  // useNavigate hook for redirecting

  // Handle input change for search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission for search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${searchQuery}`);  // Redirect to search results page with query
    }
  };

  return (
    <Navbar className='navbar' expand="lg" fixed="top">
      <Navbar.Brand as={Link} to="/">
        <img src={logo} alt="TEYORA Logo" width="120" height="50" className="d-inline-block align-top" />
        {' '}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Category" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/category/website">Website</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/poster">Poster</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/blog">Blog</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/networking">Networking</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/penetration-testing">Penetration Testing</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/designing">Designing</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Resources" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/the_Team">Team</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/blog">Blog</NavDropdown.Item>
            <NavDropdown.Item >Tools</NavDropdown.Item>
            <NavDropdown.Item >Licence</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
        </Nav>
        <div className='form-login'>
          <Form onSubmit={handleSearchSubmit} className="ml-auto d-flex align-items-center">
            <FormControl
              type="text"
              placeholder="Search"
              value={searchQuery}  // Bind input value to searchQuery state
              onChange={handleSearchChange}  // Update searchQuery state on input change
              className="mr-sm-2 search-input"
            />
            <button type="submit" className="search-button"><FaSearch /></button>
          </Form>
          <Nav.Link as={Link} to="/login" className="ml-2">
            <div className="login-button1">
              <span>Log In</span>
              <FaSignInAlt className="ml-1" />
            </div>
          </Nav.Link>
          <Nav.Link as={Link} to="/register" className="ml-2">
            <div className="signin-button">
              <span>SignUp</span>
              <FaUserPlus className="ml-1" />
            </div>
          </Nav.Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
