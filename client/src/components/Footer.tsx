import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h4>About Us</h4>
            <p>Welcome to our logistics company Vitaran! We are a leading provider of comprehensive logistics solutions tailored to meet the diverse needs of our clients. With a deep understanding of the logistics industry and a commitment to excellence, we strive to deliver efficient and reliable services that streamline supply chains and drive business success.</p>
          </div>
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul>
              <li>Email: info@vitaran.com</li>
              <li>Phone: +91 99129-85659</li>
              <li>Address: 123, Andheri East, Navi Mumbai</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;