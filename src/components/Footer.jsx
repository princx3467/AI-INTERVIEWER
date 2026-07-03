const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-top">

          {/* Logo + Tagline */}
          <div className="footer-brand">
            <div className="nav-logo">
              Mock<span>AI</span>
            </div>
            <p className="footer-tagline">
              Practice Interviews. <br />
              Get Hired Faster.
            </p>
          </div>

          {/* Links */}
          <div className="footer-links-group">
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#advantages">Advantages</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Get Started</h4>
            <ul className="footer-links">
              <li><a href="#">Sign Up Free</a></li>
              <li><a href="#">Login</a></li>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">Practice Now</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © 2025 MockAI. All rights reserved.
          </p>
          <p className="footer-made">
            Made by{" "}
            
              <a href="https://linkedin.com/in/prince-choudhury3467"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-linkedin"
            >
              Prince Choudhury
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;