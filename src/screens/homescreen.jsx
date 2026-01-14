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
            src="https://images.pexels.com/photos/1027092/pexels-photo-1027092.jpeg"
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
            src="https://images.pexels.com/photos/3993292/pexels-photo-3993292.jpeg"
            alt="Slider 1"
          />
          <img
            src="https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg"
            alt="Slider 2"
          />
          <img
            src="https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Slider 3"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
