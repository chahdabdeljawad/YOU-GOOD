import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
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
          `http://localhost:5000/api/salons?gender=${gender}`
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
            <div key={salon.id} className="salon-card">
              <img src={salon.image_url} alt={salon.name} />
              <h3>{salon.name}</h3>
              <p>{salon.city}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default SalonCartScreen;
