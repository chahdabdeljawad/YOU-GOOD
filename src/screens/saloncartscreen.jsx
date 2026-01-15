import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import "../css/saloncartscreen.css";

function SalonCartScreen({ user, setUser }) {
  const [searchParams] = useSearchParams();
  const gender = searchParams.get("gender") || "man";
  const search = searchParams.get("search") || ""; // ✅ this is your search query

  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        setLoading(true);
        console.log("Search params:", { gender, search }); // Debug log

        let url = `http://localhost:5002/api/salons?gender=${gender}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }

        console.log("Fetching from URL:", url); // Debug log

        const response = await fetch(url);
        const data = await response.json();
        console.log("API Response:", data); // Debug log
        setSalons(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, [gender, search]);

  if (loading) return <p className="loading">Loading salons...</p>;

  return (
    <>
      <main className="salon-page">
        <h2 className="salon-title">
          {gender === "man" ? "MEN SALONS" : "WOMEN SALONS"}
          {search && ` - Search: "${search}"`}
        </h2>

        {search && salons.length === 0 && (
          <div className="no-search-results">
            <p>No salons found for "{search}"</p>
            <p>Try searching for:</p>
            <ul>
              <li>City names (New York, Los Angeles)</li>
              <li>Salon names</li>
              <li>Services (haircut, shave, manicure)</li>
            </ul>
          </div>
        )}

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
              {salon.rating > 0 && (
                <div className="salon-rating">
                  {"★".repeat(salon.rating)}
                  {"☆".repeat(5 - salon.rating)}
                </div>
              )}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export default SalonCartScreen;
