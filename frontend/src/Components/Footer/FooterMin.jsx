import React from 'react';
import './FooterMin.css';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const Footermin = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-contact">
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
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 HackerSpace. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footermin;
