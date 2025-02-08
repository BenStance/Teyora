import React from 'react';
import '../assets/styles/Download.css';
import cybertrend from '../assets/images/cybertrend.webp';
import techSolution from '../assets/images/techSolution.jpeg';
import cyberprac from '../assets/images/cyberprac.jpg';
import socialmedia from '../assets/images/pict6.jpg';

const scrollToSubscription = () => {
  const subscriptionElement = document.getElementById('subscription-section');
  if (subscriptionElement) {
    subscriptionElement.scrollIntoView({ behavior: 'smooth' });
  }
};
const DownloadableResources = () => {
  return (
    <section className="download-section" id='Explore'>
      <h2 className="section-title">Downloadable Resources</h2>

      {/* Section 1 */}
      <h3>1. Whitepaper: Cybersecurity Trends and Beyond</h3>
      <p className="resource-details">
        Stay ahead of the curve with our insightful whitepaper that dives deep into the evolving landscape of cybersecurity. Discover the latest trends, understand emerging threats, and explore best practices that can help safeguard your digital infrastructure. This whitepaper is your gateway to staying informed and resilient.
      </p>
      <div className="row row-align">
        <div className="col-md-6">
          <div className="resource-description">
            <h3 className="resource-title">Whitepaper: Latest Trends in Cybersecurity</h3>
            <p className="resource-details">Learn from experts about the newest challenges in cybersecurity, and see how TEYORA can assist in defending your organization from evolving threats.</p>
            <div className="home-button">
              <span onClick={scrollToSubscription}>Get Article</span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="resource-image-container">
            <img src={cybertrend} alt="Whitepaper" className="resource-image" />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <h3>2. Case Study: TEYORA's Cybersecurity Solutions in Action</h3>
      <p className="resource-details">
        Learn how TEYORA has successfully implemented advanced cybersecurity solutions across diverse industries. Our case study outlines the unique challenges faced by our clients, the innovative strategies we deployed, and the significant results we've achieved to improve their security postures.
      </p>
      <div className="row row-align">
        <div className="col-md-6">
          <div className="resource-image-container">
            <img src={techSolution} alt="Case Study" className="resource-image" />
          </div>
        </div>
        <div className="col-md-6 ">
          <div className="resource-description">
            <h3 className="resource-title">Case Study: TEYORA’s Impact on Client Solutions</h3>
            <p className="resource-details">Read about how TEYORA delivered tailored solutions to address complex cybersecurity challenges, helping businesses strengthen their defenses and adapt to the ever-changing threat landscape.</p>
            <div className="home-button">
              <span onClick={scrollToSubscription}>Get Article</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <h3>3. E-book: Cybersecurity Essentials for Businesses</h3>
      <p className="resource-details">
        Empower your organization with our comprehensive e-book that provides essential cybersecurity practices. From securing data to implementing robust defense mechanisms, this guide is an indispensable resource for any business aiming to protect its assets in today’s digital world.
      </p>
      <div className="row row-align">
        <div className="col-md-6">
          <div className="resource-description">
            <h3 className="resource-title">E-book: Cybersecurity Best Practices</h3>
            <p className="resource-details">Download our e-book to explore critical cybersecurity tips, strategies, and best practices to help your business stay secure and compliant.</p>
            <div className="home-button">
             <span onClick={scrollToSubscription}>Get Article</span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="resource-image-container">
            <img src={cyberprac} alt="E-book" className="resource-image" />
          </div>
        </div>
      </div>


      {/* Section 4 */}
      <h3>4. Social Media Articles: Stay Updated</h3>
      <p className="resource-details">
        Stay informed about the latest cybersecurity trends and insights through our curated collection of informative social media articles. Follow us on [social media platforms] to get regular updates and valuable resources.
      </p>
      <div className="row row-align">
      <div className="col-md-6">
          <div className="resource-image-container">
            <img src={socialmedia} alt="Social Media Articles" className="resource-image" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="resource-description">
            <h3 className="resource-title">Social Media Articles</h3>
            <p className="resource-details">Access a wealth of knowledge on cybersecurity, technology, and industry news through our engaging social media posts.</p>
            <div className="home-button" >
              <span onClick={scrollToSubscription} >Get Article</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadableResources;
