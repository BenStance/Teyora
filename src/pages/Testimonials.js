import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import '../assets/styles/Home.css';
import personicon from "../assets/images/Personicon.png";

const testimonials = [
  {
    id: 1,
    name: 'Mugiabuso jr',
    comment: 'TEYORA provided exceptional service and exceeded our expectations!',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'steve',
    comment: 'Amazing experience working with TEYORA. Highly recommended!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mr.Charles',
    comment: 'Professional and efficient. We are very pleased with the results.',
    rating: 3,
  },
  {
    id: 4,
    name: 'Ben',
    comment: 'Great team, excellent service, and fantastic support.',
    rating: 4.5,
  },
];

const getStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="stars-container">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={i} className="star-icon" />
      ))}
      {halfStar && <FaStarHalfAlt className="star-icon" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={i + fullStars} className="star-icon" />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <h2 className="section-title">What Our Clients Say</h2>
      <div className="testimonial-cards">
        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.id}>
            <div className="testimonial-icon">
              <img src={personicon} alt="Client Icon" />
              <p className="client-name">{testimonial.name}</p>
            </div>
            <div className="testimonial-content">
              <p>{testimonial.comment}</p>
              <div className="testimonial-rating">{getStars(testimonial.rating)}</div>
              {/* <button className="view-button">View</button> */}
            </div>
          </div>
        ))}
      </div>
      <button className="read-more-button">Read More</button>
    </section>
  );
};

export default Testimonials;
