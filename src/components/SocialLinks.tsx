import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa";
import "./styles/SocialLinks.css";

export function SocialLinks() {
  return (
    <ul className="social-links">
      <li>
        <a href="https://github.com/lminervino18" target="_blank" rel="noopener noreferrer">
          <FaGithub className="social-icon" />
        </a>
      </li>
      <li>
        <a href="mailto:lminervino18@gmail.com" target="_blank" rel="noopener noreferrer">
          <FaEnvelope className="social-icon" />
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/lorenzominervino/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-icon" />
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/lorenzo-minervino-b309a5342/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="social-icon" />
        </a>
      </li>
    </ul>
  );
}
