import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/auth.css";

function SalonRegistration({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("man");
  const [city, setCity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !city) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5002/api/auth/register-salon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          gender,
          city,
          image_url:
            imageUrl ||
            "https://images.unsplash.com/photo-1560066984-138dadb4c035",
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setUser(data.user);
        alert("Salon registered successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Server error, try again later");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register Your Salon</h2>

        <label>Salon Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter salon name"
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter email"
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter password"
        />

        <label>Gender Focus:</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="man">Men's Salon</option>
          <option value="women">Women's Salon</option>
        </select>

        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          placeholder="Enter city"
        />

        <label>Image URL (optional):</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Leave empty for default image"
        />

        {error && <p className="error">{error}</p>}
        <button type="submit">REGISTER SALON</button>
        <p className="switch-form">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}

export default SalonRegistration;
