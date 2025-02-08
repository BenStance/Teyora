import React, {useEffect} from "react";
import '../assets/styles/getstart.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { Button } from "react-bootstrap";
import AOS from 'aos';


const GetStarted = () => {
  useEffect(() => {
    AOS.init({
      duration: 1100, // Duration of animation (in ms)
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div className="Getstart-section">
      <div className="content-wrapper">
        <div className="inner-container">
          <section className="get-section">
            <div className="container-fluid">
              <div className="row align-items-center get-words" data-aos="fade-down">
                <div className="col-md-12 get-text">
                  <h2 className="get-title"><b>
                  Don't miss out on the exclusive opportunities and insights waiting for you. Join our community today and start unlocking your potential.
                  </b></h2>
                  <h4 className="mini-title">Login to get started</h4>
                </div>
              </div>
            </div>
            <div className="Get-buttons" data-aos="fade-up">
              <Button className="get-login-button1" href="./login">
                <span>Login</span>
                <FaSignInAlt />
              </Button>
              <Button className="get-signin-button" href="./register">
                <span>SignUp</span>
                <FaUserPlus />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
