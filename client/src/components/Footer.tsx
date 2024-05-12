import React from 'react';
import '../styles/Footer.css';



function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h4>About Us</h4>
            <p>Welcome to our logistics company GoTo!<br></br>We are here to help you.</p>
            
          </div> 
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul>
              <li>Email: info@vitaran.com</li>
              <li>Phone: +91 99129-85659</li>
              
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <ul>
              <li>Insta: </li>
              
              <li>Facebook: </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
