import "../css/about.css";
import { Nav } from "react-bootstrap";

const About = () => {
  return (
    <div className="about-container">
      <main className="about-content">
        {/* About Section */}
        <section className="about-section">
          <h1 className="about-title">About YOU-GOU</h1>
          <p className="about-description">
            YOU-GOU is a modern digital platform that connects customers with
            the best beauty salons, barbers, and wellness professionals in one
            place. We make it easy to discover, book, and manage salon services
            online.
          </p>
          <p className="carbon-ad">
            Our goal is to help salons grow their business while giving clients
            a smooth and enjoyable booking experience.
          </p>
          <div className="ad-tag">BEAUTY • STYLE • TECHNOLOGY</div>
        </section>

        <hr className="section-divider" />

        {/* Team Section */}
        <section className="team-section">
          <h2 className="section-title">Our Team</h2>
          <p className="section-description">
            YOU-GOU is built by a passionate{" "}
            <strong>team of developers and designers</strong>
            who believe that beauty services should be easy to access and simple
            to manage. We work every day to improve the platform for both salon
            owners and clients.
          </p>
        </section>

        <hr className="section-divider" />

        {/* Partners / Salons Section */}
        <section className="contributors-section">
          <h2 className="section-title">Partner Salons</h2>
          <p className="section-description">
            We collaborate with talented{" "}
            <strong>salons, barbers, and beauty experts</strong>
            to offer high-quality services on YOU-GOU. If you own a salon, you
            can join our platform and start receiving bookings online.
          </p>

          <div className="get-involved">
            <a href="#" className="involved-link">
              Join as a Salon
            </a>
            <p className="involved-text">
              Become a partner on YOU-GOU by registering your salon and adding
              your services. Grow your business and reach more clients through
              our platform.
            </p>
          </div>
        </section>

        <hr className="section-divider" />

        {/* External Links */}
        <section className="external-links">
          <h3 className="links-title">Useful Links</h3>
          <ul className="links-list">
            <li>
              <a href="#" className="link-item">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="link-item">
                Find a Salon
              </a>
            </li>
            <li>
              <a href="#" className="link-item">
                Become a Partner
              </a>
            </li>
            <li>
              <a href="#" className="link-item">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="link-item">
                Support
              </a>
            </li>
          </ul>
        </section>

        {/* Navigation */}
        <div className="page-navigation">
          <div className="nav-prev">
            <strong>Previous</strong>
            <br />
            <a href="#" className="nav-link">
              « Home
            </a>
          </div>
          <div className="nav-next">
            <strong>Next</strong>
            <br />
            <a href="#" className="nav-link">
              Find a Salon »
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
