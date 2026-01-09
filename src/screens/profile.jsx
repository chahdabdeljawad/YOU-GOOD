import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]); // user history
  const [rating, setRating] = useState(0); // for salon
  const [description, setDescription] = useState(""); // for salon
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      navigate("/login"); // redirect if not logged in
    } else {
      setUser(savedUser);

      // Load user reservation history if role is USER
      if (savedUser.role === "USER") {
        fetch(`http://localhost:5000/api/reservations/${savedUser.id}`)
          .then((res) => res.json())
          .then((data) => setReservations(data))
          .catch((err) => console.error(err));
      }

      // Load salon info if role is SALON
      if (savedUser.role === "SALON") {
        fetch(`http://localhost:5000/api/salons/${savedUser.id}`)
          .then((res) => res.json())
          .then((data) => {
            setRating(data.rating || 0);
            setDescription(data.description || "");
          })
          .catch((err) => console.error(err));
      }
    }
  }, [navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={user.photo} alt="profile" className="profile-photo" />
        <h2>{user.name}</h2>
      </div>

      {user.role === "USER" && (
        <div className="profile-section">
          <h3>Reservation History</h3>
          {reservations.length === 0 ? (
            <p>No reservations yet.</p>
          ) : (
            <ul>
              {reservations.map((res) => (
                <li key={res.id}>
                  {res.date} - {res.salonName} ({res.status})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {user.role === "SALON" && (
        <div className="profile-section">
          <h3>Salon Info</h3>
          <label>Rating:</label>
          <input
            type="number"
            value={rating}
            min="0"
            max="5"
            step="0.1"
            onChange={(e) => setRating(e.target.value)}
          />
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add salon description..."
          ></textarea>
          <button
            onClick={() => {
              fetch(`http://localhost:5000/api/salons/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rating, description }),
              })
                .then((res) => res.json())
                .then((data) => alert("Salon info updated!"))
                .catch((err) => console.error(err));
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
