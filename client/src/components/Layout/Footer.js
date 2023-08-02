import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../../styles/Footer.css";
import useCategory from "../../hooks/useCategory";

const Footer = () => {
  const categories = useCategory();
  return (
    // <div className="footer">
    //     <h4 className="text-center">
    //         All Right Reserved &copy; TRX Solutions Corporation
    //     </h4>
    //     <p className="text-center mt-3">
    //       <Link to="/about">About</Link>|
    //       <Link to="/contact">Contact</Link>|
    //       <Link to="/policy">Privacy Policy</Link>
    //     </p>
    // </div>
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3 className="footer-heading">Company Profile</h3>
          <ul className="footer-list">
            <Link className="footer-list-item" to={`/about`}>
              About us
            </Link>
          </ul>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Categories</h3>
          <ul className="footer-list">
            {categories?.map((c) => (
              <li className="footer-list-item" key={c.slug}>
                <Link to={`/category/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Social Media</h3>
          <div className="social-media-icons">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="social-media-icon" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="social-media-icon" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="social-media-icon ig" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
