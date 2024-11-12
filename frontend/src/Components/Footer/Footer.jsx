import React from 'react';
import './Footer.css'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaPhone, FaEnvelope } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-content">
      <div className="footer-about">
        <h3>About</h3>
        <ul>
          <li>Who We Are</li>
          <li>Career</li>
          <li>Events</li>
          <li>Services</li>
        </ul>
      </div>

      <div className="footer-contact">
        <div className='contact-btn'>
        <h3>Contact Us</h3>
        </div>
        <div className='contact'>
        <div className='phone'>
        <a href="tel:+1234567890" aria-label="Call us">
        <FaPhone size={24} />123 456 7890
        </a>
        </div>
        <div className='mail'>
        <a href="mailto:hackerspacemsit@gmail.com" aria-label="Email us">
        <FaEnvelope size={24} />hackerspacemsit@gmail.com
      </a>
        </div>
        </div>
      </div>

      <div className="footer-social">
        <h3>Connect With Us</h3>
        <div className="social-icons">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
        <FaFacebook size={30} color="#ffffff" />
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={30} color="#ffffff" />
      </a>
      <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
        <FaLinkedin size={30} color="#ffffff" />
      </a>
      <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
        <FaTwitter size={30} color="#ffffff" />
      </a>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <p>&copy; 2024 HackerSpace. All Rights Reserved.</p>
    </div>
  </footer>
  );
};

export default Footer;
