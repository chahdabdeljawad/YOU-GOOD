import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/auth.css";

function Signin() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("man");
  const [role, setRole] = useState("USER");
  const [photo, setPhoto] = useState(""); // <-- new state for profile picture
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const SigninHandle = async (e) => {
    e.preventDefault();

    if (!name || !lastName || !email || !password || !gender || !role) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${name} ${lastName}`, // combine name + lastname
          email,
          password,
          gender,
          role,
          photo: photo || "https://i.pravatar.cc/150", // default if empty
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        alert("Account created successfully!");
        navigate("/login");
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

        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="man">Man</option>
          <option value="woman">Woman</option>
        </select>

        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">User</option>
          <option value="SALON">Salon</option>
        </select>

        <label>Profile Picture URL:</label>
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Enter image URL (optional)"
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
}

export default Signin;
