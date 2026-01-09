import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../css/reservation.css";

function ReservationScreen() {
  const { salonId } = useParams();
  const navigate = useNavigate();

  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const fetchSalon = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/salons/${salonId}`
        );
        if (!response.ok) throw new Error("Salon not found");
        const data = await response.json();
        setSalon(data);
      } catch (err) {
        console.error(err);
        setSalon(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSalon();
  }, [salonId]);

  if (loading) return <p>Loading salon details...</p>;
  if (!salon) return <p>Salon not found.</p>;

  const categories = salon.categories || []; // [{name: 'Hair', image: 'url'}, ...]

  const availableDates = ["2026-01-10", "2026-01-11", "2026-01-12"]; // example dates
  const availableTimes = ["10:00", "11:00", "12:00", "14:00", "15:00"]; // example times

  // Handle reservation confirmation
  const handleConfirm = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salon_id: salon.id,
          user_id: 1, // TODO: replace with actual logged-in user ID
          category: selectedCategory,
          date: selectedDate,
          time: selectedTime,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Reservation Confirmed!");
        navigate("/salons"); // redirect back to salons page
      } else {
        alert(data.error || "Failed to confirm reservation");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving reservation");
    }
  };

  return (
    <>
      <Navbar />
      <main className="reservation-page">
        {/* Salon Info */}
        <div className="salon-info">
          <img src={salon.image_url} alt={salon.name} className="salon-photo" />
          <div className="salon-details">
            <h2>{salon.name}</h2>
            <p>{salon.city}</p>
            <div className="rating">
              {"★".repeat(salon.rating || 4)}
              {"☆".repeat(5 - (salon.rating || 4))}
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <h3 className="section-title">Select a Category</h3>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`category-card ${
                selectedCategory === cat.name ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <img src={cat.image} alt={cat.name} />
              <p>{cat.name}</p>
            </div>
          ))}
        </div>

        {/* Date Selection */}
        {selectedCategory && (
          <>
            <h3 className="section-title">Select a Date</h3>
            <div className="dates-grid">
              {availableDates.map((date) => (
                <button
                  key={date}
                  className={`date-btn ${
                    selectedDate === date ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime(null); // reset time when changing date
                  }}
                >
                  {date}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Time Selection */}
        {selectedDate && (
          <>
            <h3 className="section-title">Select a Time</h3>
            <div className="times-grid">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`time-btn ${
                    selectedTime === time ? "active" : ""
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Confirm / Back Buttons */}
        {(selectedTime || selectedDate || selectedCategory) && (
          <div className="confirm-btn-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
              ← Back
            </button>
            {selectedTime && (
              <button className="confirm-btn" onClick={handleConfirm}>
                Confirm Reservation
              </button>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default ReservationScreen;
