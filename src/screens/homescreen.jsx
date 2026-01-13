import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../css/home.css";

function Home({ user, setUser }) {
  return (
    <div className="home-container">
      <Navbar user={user} setUser={setUser} />

      {/* Main content wrapper */}
      <main className="main-content">
        {/* YOU GOOD Title - moved from navbar to here */}
        <div className="nav-center">WELCOME TO YOU GOOD</div>

        {/* NEW COLLECTION */}
        <section className="section-title">
          <h2>NEW COLLECTION</h2>
        </section>

        {/* Slider 1 */}
        <section className="fade-slider">
          <img
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15"
            alt="Slider 1"
          />
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
            alt="Slider 2"
          />
          <img
            src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250"
            alt="Slider 3"
          />
        </section>

        {/* Gender links */}
        <section className="gender-links">
          <Link to="/salons?gender=man" className="gender-link">
            MEN
          </Link>

          <Link to="/salons?gender=women" className="gender-link">
            WOMEN
          </Link>
        </section>

        {/* STYLE YOUR WAY */}
        <section className="section-title">
          <h2>STYLE YOUR WAY</h2>
        </section>

        {/* Slider 2 */}
        <section className="fade-slider">
          <img
            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15"
            alt="Slider 1"
          />
          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
            alt="Slider 2"
          />
          <img
            src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250"
            alt="Slider 3"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
