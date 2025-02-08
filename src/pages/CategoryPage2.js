import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';  // Add Link from react-router-dom
import { Container, Row, Col, Image} from 'react-bootstrap'; // Import Button from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/category.css';  // Your custom CSS
import websiteImg from '../assets/images/forensic.jpg';
import posterImg from '../assets/images/whiteposter.webp';
import blogImg from '../assets/images/blog.jpg';
import networkingImg from '../assets/images/pict1.jpg';
import pentestImg from '../assets/images/pict5.jpg';
import designImg from '../assets/images/design.jpg';

// Importing animations from react-reveal
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide';

function CategoryPage() {
  // Get category name from the URL parameters
  const { categoryName } = useParams();

  // Memoize the categories object to prevent re-initialization on every render
  const categories = useMemo(() => ({
  website: {
    name: 'Website',
    image: websiteImg,
    description: 'We offer cutting-edge website development services with responsive design, ensuring a seamless user experience.',
    descriptionParagraph: 'Our expert web developers craft visually stunning and user-friendly websites that capture your brand\'s essence and drive results. We specialize in creating responsive designs that adapt to different devices, ensuring a consistent experience across all platforms.',
  },
  poster: {
    name: 'Poster',
    image: posterImg,
    description: 'Create visually stunning posters that capture attention and communicate your message effectively.',
    descriptionParagraph: 'Our design team specializes in creating eye-catching posters that convey your brand\'s message clearly and effectively. We use the latest design trends and techniques to ensure your posters stand out from the crowd.',
  },
  blog: {
    name: 'Blog',
    image: blogImg,
    description: 'Share your thoughts with the world! Our blogging platform is optimized for engagement and readability.',
    descriptionParagraph: 'Our blogging platform provides a powerful and user-friendly interface for creating and managing your blog content. We optimize your blog for search engines and social media to maximize visibility and engagement.',
  },
  networking: {
    name: 'Networking',
    image: networkingImg,
    description: 'We provide networking solutions to keep your business connected and secure.',
    descriptionParagraph: 'Our networking experts design and implement robust and secure network infrastructure to ensure your business operates smoothly and efficiently. We offer a range of services, including network installation, maintenance, and troubleshooting.',
  },
  'penetration-testing': {
    name: 'Penetration Testing',
    image: pentestImg,
    description: 'Our penetration testing services ensure that your infrastructure is secure from cyber threats.',
    descriptionParagraph: 'Our skilled penetration testers simulate real-world attacks to identify vulnerabilities in your systems and networks. We provide detailed reports and recommendations to help you strengthen your security posture.',
  },
  designing: {
    name: 'Designing',
    image: designImg,
    description: 'From UI/UX to graphic design, we bring creativity to every project we undertake.',
    descriptionParagraph: 'Our talented design team specializes in creating visually stunning and user-friendly designs. We offer a wide range of services, including UI/UX design, graphic design, logo design, and branding.',
  },
  }), []);  // Empty dependency array ensures this is created once

  // Set the active category based on the URL
  const [activeCategory, setActiveCategory] = useState(categories[categoryName]);

  // Update the active category when the URL changes
  useEffect(() => {
    setActiveCategory(categories[categoryName]);
  }, [categoryName, categories]);  // Now the 'categories' is memoized

  return (
    <Container fluid className="category-page mt-5 pt-5">
      {/* Animated Title Section */}
      <Row className="text-center mb-4">
        <Col>
          <Fade bottom>
            <h1 className="category-title">{activeCategory?.name}</h1>
          </Fade>
          <Fade bottom delay={300}>
            <p className="category-subtitle">{activeCategory?.description}</p>
          </Fade>
        </Col>
      </Row>

      {/* Image and Description with Animation */}
      <Row className="align-items-center">
        <Col md={6} className="category-image">
          <Zoom>
            <Image src={activeCategory?.image} alt={activeCategory?.name} fluid className="rounded shadow-lg" />
          </Zoom>
        </Col>

        <Col md={6} className="category-description">
          <Slide right>
            <h2>{activeCategory?.name}</h2>
            <p>{activeCategory?.descriptionParagraph}</p>
            {/* Get Started Button */}
            {/* <Button as={Link} to="/get-started" variant="primary" className="mt-3">
              Get Started
            </Button> */}
          </Slide>
        </Col>
      </Row>
    </Container>
  );
}

export default CategoryPage;
