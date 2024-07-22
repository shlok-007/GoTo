import "../styles/footer.css";
import React from "react";

import { SVGInstagram, SVGGithub, SVGLinkedin } from "./SVGIcons";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <div className="contribute">
          <h4>Contribute here</h4>
          
          <a
            href="https://github.com/shlok-007/GoTo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SVGGithub />
          </a>

        </div>
        <div className="developers">
          <h4>Developers</h4>

          <div className="developer">
            <div className="dev-detail">
              <div className="dev-name">Shlok Kumar Shaw</div>
              <div className="dev-role">Lead • Backend • Frontend</div>
            </div>
            <div className="dev-social">
              <a
                href="https://github.com/shlok-007"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGGithub width="25" height="25"/>
              </a>
              <a
                href="https://www.linkedin.com/in/shlok-kumar-shaw-71a883203"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGLinkedin  width="25" height="25"/>
              </a>
              <a
                href="https://www.instagram.com/shlok_3.14"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGInstagram width="25" height="25" />
              </a>
              
            </div>
          </div>

          <div className="developer">
            <div className="dev-detail">
              <div className="dev-name">Shahji</div>
              <div className="dev-role">Frontend</div>
            </div>
            <div className="dev-social">
              <a
                href="https://github.com/in/developer1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGGithub width="25" height="25"/>
              </a>
              <a
                href="https://linkedin.com/in/developer1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGLinkedin  width="25" height="25"/>
              </a>
              <a
                href="https://instagram.com/developer1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGInstagram width="25" height="25" />
              </a>
              
            </div>
          </div>

          <div className="developer">
            <div className="dev-detail">
              <div className="dev-name">Varsha Swaraj</div>
              <div className="dev-role">Frontend</div>
            </div>
            <div className="dev-social">
              <a
                href="https://github.com/callmeVAMP"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGGithub width="25" height="25"/>
              </a>
              <a
                href="https://www.linkedin.com/in/varsha-swaraj-843724274"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGLinkedin  width="25" height="25"/>
              </a>
              <a
                href="https://www.instagram.com/callmevam___p"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SVGInstagram width="25" height="25" />
              </a>
              
            </div>
          </div>

        </div>
      </div>
      <div className="powered-by">
        Powered by the WebnD society, IIT BBS
      </div>
    </footer>
  );
};

export default Footer;
