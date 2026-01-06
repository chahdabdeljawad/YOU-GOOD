import { useState } from "react";
import "../../css/auth.css";

function Signin() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const SigninHandle = (e) => {
    e.preventDefault();

    if (!name || !lastname || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
  };

  return (
    <div>
      <form onSubmit={SigninHandle}>
        <h2>join YOU GOOD</h2>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>LastName:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="mail"
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
        <button type="submit">SIGNIN</button>
      </form>
    </div>
  );
}
export default Signin;
