import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 */}
        <div className="footer-column">
          <h4>YOU-GOU</h4>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Find a Salon</a>
            </li>
            <li>
              <a href="#">Become a Partner</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div className="footer-column">
          <h4>Community</h4>
          <ul>
            <li>
              <a href="#">Salon Owners</a>
            </li>
            <li>
              <a href="#">Customers</a>
            </li>
            <li>
              <a href="#">Help Center</a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-column">
          <h4>More</h4>
          <ul>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">© 2025 YOU-GOU. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
