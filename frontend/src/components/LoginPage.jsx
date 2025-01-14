import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginPage.css"

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateForm = () => {
        if (!username) {
            setError("Username is required.");
            return false;
        }
        if (!password) {
            setError("Password is required.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        const formDetails = new URLSearchParams();
        formDetails.append("username", username);
        formDetails.append("password", password);

        try {
            const response = await fetch("http://localhost:8000/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formDetails,
            });

            setLoading(false);

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.access_token);
                navigate("/protected");
            } else {
                const errorData = await response.json();
                setError(errorData.detail || "Authentication failed!");
            }
        } catch (error) {
            setLoading(false);
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="wrapper">

            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

                <div className="input-box">
                    <input
                        placeholder="Username" 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                        required 
                    />
                    <i className='bx bxs-user'></i>
                </div>

                <div className="input-box">
                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        required 
                    />
                    <i className='bx bxs-lock' ></i>
                </div>

                <div className="remember-forgot">
                    <label for="">
                        <input type="checkbox" />Remember Me
                    </label>
                    <a href="#">Forgot Password?</a>
                </div>

                <button type="submit" disabled={loading} className="btn">
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="register-link">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div> 
            </form>

        </div>
    )
}

export default LoginPage;
