import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/profile.css";

export default function Profile({ user }) {
  const [reservations, setReservations] = useState([]);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Load data when user is available
  useEffect(() => {
    if (!user) return;

    // USER reservations
    if (user.role === "USER") {
      fetch(`http://localhost:5002/api/reservations/${user.id}`)
        .then((res) => res.json())
        .then((data) => setReservations(data))
        .catch((err) => console.error(err));
    }

    // SALON info
    if (user.role === "SALON") {
      fetch(`http://localhost:5002/api/salons/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setRating(data.rating || 0);
          setDescription(data.description || "");
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src={user.photo || `https://i.pravatar.cc/150?u=${user.id}`}
          alt="profile"
          className="profile-photo"
        />
        <h2>{user.name}</h2>
      </div>

      {/* USER */}
      {user.role === "USER" && (
        <div className="profile-section">
          <h3>Reservation History</h3>

          {reservations.length === 0 ? (
            <p>No reservations yet.</p>
          ) : (
            <ul>
              {reservations.map((res) => (
                <li key={res.id}>
                  {res.date} – {res.salonName} ({res.status})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* SALON */}
      {user.role === "SALON" && (
        <div className="profile-section">
          <h3>Salon Info</h3>

          <label>Rating</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add salon description..."
          />

          <button
            onClick={() => {
              fetch(`http://localhost:5002/api/salons/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rating, description }),
              })
                .then(() => alert("Salon info updated"))
                .catch(console.error);
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
