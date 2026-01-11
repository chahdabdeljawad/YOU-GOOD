// Signin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/auth.css";

function Signin({ setUser }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("USER");
  const [photo, setPhoto] = useState("");
  const [city, setCity] = useState(""); // Add city field
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const SigninHandle = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !gender ||
      !role
    ) {
      setError("Please fill in all required fields");
      return;
    }

    // If role is SALON, require city
    if (role === "SALON" && !city.trim()) {
      setError("City is required for salon registration");
      return;
    }

    setError("");

    try {
      const res = await fetch("http://localhost:5002/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${name} ${lastName}`,
          email,
          password,
          gender,
          role,
          photo: photo || "https://i.pravatar.cc/150",
          city: role === "SALON" ? city : null,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        // Auto login after registration
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setUser(data.user);
        alert("Account created successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Server error, try again later");
    }
  };

  return (
    <div>
      <form onSubmit={SigninHandle}>
        <h2>Join YOU GOOD</h2>

        <label>First Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Gender:</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="man">Man</option>
          <option value="women">Woman</option>
        </select>

        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="USER">User</option>
          <option value="SALON">Salon</option>
        </select>

        {/* Show city field only for SALON role */}
        {role === "SALON" && (
          <>
            <label>City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              required
            />
          </>
        )}

        <label>Profile Picture URL (optional):</label>
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Enter image URL"
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
}

export default Signin;
