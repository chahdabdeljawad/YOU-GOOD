import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../css/home.css";

function Home() {
  return (
    <>
      <Navbar />

      <div className="page">
        {/* NEW COLLECTION */}
        <section className="section-title">
          <h2>NEW COLLECTION</h2>
        </section>

        {/* Slider 1 */}
        <section className="fade-slider">
          <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15" />
          <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" />
          <img src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250" />
        </section>

        {/* Gender links */}
        <section className="gender-links">
          <Link to="/carte?category=man" className="gender-link">
            MEN
          </Link>
          <Link to="/carte?category=women" className="gender-link">
            WOMEN
          </Link>
        </section>

        {/* STYLE YOUR WAY */}
        <section className="section-title">
          <h2>STYLE YOUR WAY</h2>
        </section>

        {/* Slider 2 */}
        <section className="fade-slider">
          <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15" />
          <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" />
          <img src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250" />
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Home;
