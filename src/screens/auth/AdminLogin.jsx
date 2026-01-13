import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/auth.css";

function AdminLogin({ setAdmin }) {
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
      const res = await fetch("http://localhost:5002/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        localStorage.setItem("admin", JSON.stringify(data.admin));
        localStorage.setItem("adminToken", data.token);
        setAdmin(data.admin);
        navigate("/admin");
      }
    } catch (err) {
      console.error(err);
      setError("Server error, try again later");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <p className="admin-note">Access admin dashboard</p>

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@yougood.com"
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="admin-btn">
          LOGIN AS ADMIN
        </button>

        <div className="auth-links">
          <p>
            <a href="/login">User Login</a> |<a href="/signin">User Signup</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
