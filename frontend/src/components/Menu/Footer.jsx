import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

//Parte Inferior de la web con contacto + copyright
function Footer() {
    return (
      <footer className="Footer">
        <div className="ContenidoFooter">
          <a href="mailto:searchgg@support.com" className="LinkMail">
            <FontAwesomeIcon icon={faEnvelope} className="LinkIcon" />
          </a>
          <div className="Copyright">
            Copyright © {new Date().getFullYear()} Abimael
          </div>
        </div>
      </footer>
    );
}

export default Footer;
