import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import "../css/saloncartscreen.css";

function SalonCartScreen() {
  const [searchParams] = useSearchParams();
  const gender = searchParams.get("gender") || "man";

  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await fetch(
          `http://localhost:5002/api/salons?gender=${gender}`
        );
        const data = await response.json();
        setSalons(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, [gender]);

  if (loading) return <p>Loading salons...</p>;

  return (
    <>
      <Navbar />

      <main className="salon-page">
        <h2 className="salon-title">
          {gender === "man" ? "MEN SALONS" : "WOMEN SALONS"}
        </h2>

        <div className="salon-grid">
          {salons.map((salon) => (
            <Link
              key={salon.id}
              to={`/reservation/${salon.id}`}
              className="salon-card"
            >
              <img src={salon.image_url} alt={salon.name} />
              <h3>{salon.name}</h3>
              <p>{salon.city}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SalonCartScreen;
