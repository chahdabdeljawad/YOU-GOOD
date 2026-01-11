import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/auth.css";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");

    try {
      const res = await fetch("http://localhost:5002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        // Add fallback photo if none exists
        const loggedInUser = {
          ...data.user,
          photo:
            data.user.photo || `https://i.pravatar.cc/150?u=${data.user.id}`,
        };

        localStorage.setItem("user", JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("Server error, try again later");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Welcome back to YOU GOOD</h2>
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}

export default Login;
