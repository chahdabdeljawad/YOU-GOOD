import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/home.css";

function Home({ user, setUser }) {
  const [bestSalons, setBestSalons] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5002/api/salons?limit=4")
      .then((res) => res.json())
      .then((data) =>
        setBestSalons(
          data
            .sort((a, b) => b.rating - a.rating) // highest rating first
            .slice(0, 4)
        )
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-container">
      <main className="main-content">
        {/* NEW COLLECTION */}
        <section className="section-title">
          <h2>NEW COLLECTION</h2>
        </section>

        {/* Slider 1 */}
        <section className="fade-slider">
          <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15" />
          <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9" />
          <img src="https://images.pexels.com/photos/1027092/pexels-photo-1027092.jpeg" />
        </section>

        {/* BEST SALONS */}
        <section className="section-title">
          <h2>BEST SALONS</h2>
        </section>

        <section className="best-salons">
          {bestSalons.map((salon) => (
            <Link
              key={salon.id}
              to={`/reservation/${salon.id}`}
              className="best-salon-card"
            >
              <img src={salon.image_url} />
              <h3>{salon.name}</h3>
              <p>{salon.city}</p>
            </Link>
          ))}
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

        <section className="fade-slider">
          <img src="https://images.pexels.com/photos/3993292/pexels-photo-3993292.jpeg" />
          <img src="https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg" />
          <img src="https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg" />
        </section>
      </main>
    </div>
  );
}

export default Home;
