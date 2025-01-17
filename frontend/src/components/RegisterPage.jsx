import styles from '../css/RegisterPage.module.css';
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";

const RegisterPage = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username) {
        setError("Username is required.");
        return false;
    }
    if (!email) {
      setError("Username is required.");
      return false;
    }
    if (!password) {
        setError("Password is required.");
        return false;
    }
    if (!confirm_password) {
      setError("Username is required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const userInfo = { username, email, password, confirm_password };

    try {
        const response = await fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
        });

        setLoading(false);

        console.log(JSON.stringify(userInfo));
        console.log(response);

        if (response.ok) {
            navigate("/");
        } else {
            const errorData = await response.json();
            setError(errorData.detail || "Register failed!");
        }
    } catch (error) {
        setLoading(false);
        setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>

        <div className={styles.inputBox}>
          <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required 
          />
          <i className="bx bxs-user"></i>
        </div>

        <div className={styles.inputBox}>
          <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required 
          />
          <i className="bx bxs-envelope"></i>
        </div>

        <div className={styles.inputBox}>
          <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required 
          />
          <i className="bx bxs-lock"></i>
        </div>

        <div className={styles.inputBox}>
          <input
              placeholder="Confirm Password"
              type="password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required 
          />
          <i className="bx bxs-lock"></i>
        </div>

        <div className={styles.remeberForgot}>
          <label>
            <input type="checkbox" className={styles.checkBox} /> I agree to all statements in
          </label>
          <a href="#">Terms of service</a>
        </div>

        <button type="submit" disabled={loading} className={styles.btn}>
          Register
        </button>

        <div className={styles.registerLink}>
          <p>
            Already have an account? <Link to="/" className={styles.loginPageLink}>Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
