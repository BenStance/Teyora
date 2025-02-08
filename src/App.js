import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoggedInNavbar from './components/LoggedInNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProgress from './pages/UserProgress';
import Dashboard from './pages/Dashboard';
import GetStarted from './pages/Get-Started';
import About from './pages/About';
import Subscription from './pages/Subscription';
import UserPage from './pages/UserPage';
import CategoryPage from './pages/CategoryPage';
import CategoryPage2 from './pages/CategoryPage2';
import Policy from './pages/policy';
import TermsOfUse from './pages/TermsOfUse';
import './assets/styles/main.css';
import './assets/styles/App.css';
import NewProject from './pages/NewProject';
import SearchResults from './pages/SearchResult';
import SearchResults2 from './pages/search-in';
import Team2 from './pages/Team2';
import Blog from './pages/Blog';
import ForgotPasswordPage from './pages/forget-password';

// Utility to check if the user is authenticated (syncing with the backend)
const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.isAuthenticated;
};

// Utility to check if the user is an admin (syncing with the backend)
const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.isAdmin;
};

// ProtectedRoute component to secure routes for logged-in users
const ProtectedRoute = ({ element, redirectTo = '/login' }) => {
    return isAuthenticated() ? element : <Navigate to={redirectTo} />;
};

// AdminRoute component to secure routes for admin users
const AdminRoute = ({ element, redirectTo = '/user-page' }) => {
    return isAdmin() ? element : <Navigate to={redirectTo} />;
};

// PublicRoute component to prevent logged-in users from accessing public pages
const PublicRoute = ({ element, redirectTo = '/user-page' }) => {
    return isAuthenticated() ? <Navigate to={redirectTo} /> : element;
};

function App() {
    const location = useLocation();
    const navigate = useNavigate();  // Used for redirection based on role
    const [authStatus, setAuthStatus] = useState({
        isAuthenticated: false,
        isAdmin: false,
        isLoading: true,
    });

    // Fetch user info to determine authentication and role status from the backend
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('http://localhost:5000/user-info', {
                    method: 'GET',
                    credentials: 'include',  // Session-based auth, must include credentials
                });

                if (response.ok) {
                    const data = await response.json();

                    // Update localStorage and auth state
                    localStorage.setItem(
                        'user',
                        JSON.stringify({
                            isAuthenticated: true,
                            isAdmin: data.is_admin,  // Store admin status from Flask
                        })
                    );

                    setAuthStatus({
                        isAuthenticated: true,
                        isAdmin: data.is_admin,
                        isLoading: false,
                    });

                    // Redirect after login based on role
                    if (location.pathname === '/login' || location.pathname === '/') {
                        if (data.is_admin) {
                            navigate('/admin-dashboard');
                        } else {
                            navigate('/user-page');
                        }
                    }
                } else {
                    // Handle the case where the user is not authenticated
                    setAuthStatus({
                        isAuthenticated: false,
                        isAdmin: false,
                        isLoading: false,
                    });
                    localStorage.removeItem('user');  // Clear local storage on failed auth
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                setAuthStatus({
                    isAuthenticated: false,
                    isAdmin: false,
                    isLoading: false,
                });
                localStorage.removeItem('user');  // Clear local storage if an error occurs
            }
        };

        checkAuthStatus();
    }, [location.pathname, navigate]);

    // Array of routes where no Navbar should be shown
    const noNavbarRoutes = ['/login', '/register', '/get-started', '/subscription'];

    if (authStatus.isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner">
                    <div className="semi-circle semi1"></div>
                    <div className="semi-circle semi2"></div>
                    <div className="semi-circle semi3"></div>
                </div>
            </div>
        ); // Show the loading spinner while checking auth status
    }

    return (
        <div className="app-container">
            {/* Conditionally render Navbar or LoggedInNavbar based on auth status and route */}
            {!noNavbarRoutes.includes(location.pathname) && (
                authStatus.isAuthenticated ? <LoggedInNavbar /> : <Navbar />
            )}

            <div className="app-content">
                <Routes>
                    {/* Home route protected by PublicRoute (logged-in users can't access this) */}
                    <Route path="/" element={<PublicRoute element={<Home />} />} />

                    {/* Public routes */}
                    <Route path="/login" element={<PublicRoute element={<Login />} />} />
                    <Route path="/register" element={<PublicRoute element={<Register />} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/get-started" element={<GetStarted />} />
                    <Route path="/subscription" element={<Subscription />} />
                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                    <Route path="/category-in/:categoryName" element={<CategoryPage2 />} />
                    <Route path="/policy" element={<Policy />} />
                    <Route path="/terms" element={<TermsOfUse />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path='/the_Team' element={<Team2 />}/>
                    <Route path='/blog' element={<Blog />} />
                    <Route path='/forgot-password' element={<ForgotPasswordPage />} />


                    {/* Protected routes for authenticated users */}
                    <Route path="/user-progress" element={<ProtectedRoute element={<UserProgress />} />} />
                    <Route path="/user-page" element={<ProtectedRoute element={<UserPage />} />} />
                    <Route path="/search-in" element={<ProtectedRoute element={<SearchResults2 />}  />} />

                    {/* Admin-only route */}
                    <Route path="/admin-dashboard" element={<AdminRoute element={<Dashboard />} />} />
                    <Route path="/new_project" element={<AdminRoute element={<NewProject />} />} />                </Routes>
            </div>
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
