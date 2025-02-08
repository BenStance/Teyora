import React, { useState, useEffect } from 'react';
import '../assets/styles/portfolio.css';

const projects = [
  {
    id: 1,
    title: 'Video Forensic Tool Development',
    description: 'A cutting-edge forensic tool for analyzing video footage, used by law enforcement.',
    technologies: ['Python', 'OpenCV','Flask', 'Machine Learning','Vue'],
    image: require('../assets/images/forensic.jpg'),
  },
  {
    id: 2,
    title: 'Government Building LAN Installation',
    description: 'LAN installation for a government building ensuring secure and fast connectivity.',
    technologies: ['Networking','Termination','Routing','UTP & Fiber'],
    image: require('../assets/images/lan-installation.jpeg'),
  },
  {
    id: 3,
    title: 'Website & Poster Design',
    description: 'Design visually appealing and responsive websites and impactful posters for marketing campaigns.',    technologies: ['Photoshop','Web Frameworks', 'IA', 'Block Chain'],
    image: require('../assets/images/poster.webp'),
  },
  {
    id: 4,
    title: 'Penetration Testing',
    description: 'Ethical hacking in different web and mobile applications to strengthen security',
    technologies: ['Red Teaming', 'Blue Teaming', 'Web and Network Pentesting'],
    image: require('../assets/images/pict5.jpg'),
  },
  {
    id: 5,
    title: 'Cloud Computing Implementation',
    description: "Build secure and scalable cloud solutions on AWS, Azure, and Docker for enterprise clients.",
    technologies: ['AWS', 'Azure', 'Docker', 'Oracle Cloud','IBM'],
    image: require('../assets/images/cloud.jpg'),
  },
  {
  id: 6,
  title: 'Mobile App Development',
  description: 'Development of high-performance mobile applications for iOS and Android.',
  technologies: ['React Native', 'Swift', 'Kotlin','iOS', 'Android'],
  image: require('../assets/images/mobile-app.avif'),
  },
  {
    id: 7,
    title: 'Computer Maintenance',
    description: 'Expert computer repair and maintenance services, including hardware upgrades, software installations, and virus removal.',
    technologies: ['OS', 'Hardware Repair', 'Software Troubleshooting'],
    image: require('../assets/images/CompMaintainance.jpg'),
  },
];

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 4 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 4 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsAutoScroll(true);
      } else {
        setIsAutoScroll(false);
      }
    };

    // Initial check
    handleResize();

    // Set up a listener for window resize
    window.addEventListener('resize', handleResize);

    // Auto-scrolling logic
    const autoScroll = setInterval(() => {
      if (isAutoScroll) {
        handleNextClick();
      }
    }, 4000); // Adjust the interval for desired scrolling speed

    // Cleanup function
    return () => {
      clearInterval(autoScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isAutoScroll, currentIndex]);


  return (
    <section className="portfolio-section">
      <h2 className="section-title">Our Portfolio</h2>
      <div className="portfolio-container">
        <button className="arrow left-arrow" onClick={handlePrevClick}>
          &#8249;
        </button>
        <div className="portfolio-carousel">
          <div
            className="portfolio-grid"
            style={{
              transform: `translateX(-${currentIndex * 25}%)`,
            }}
          >
            {projects.map((project) => (
              <div className="portfolio-card" key={project.id}>
                <img src={project.image} alt={project.title} className="portfolio-image" />
                <div className="portfolio-content">
                  <h3 className="portfolio-title">{project.title}</h3>
                  <p className="portfolio-description">{project.description}</p>
                  <div className="portfolio-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="technology-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="arrow right-arrow" onClick={handleNextClick}>
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default Portfolio;
