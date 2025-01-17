import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import styles from "../css/LoginPage.module.css";

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [shake, setShake] = useState(false); 

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

    const triggerError = (message) => {
        setError(message);
        setShake(true); // Trigger the shake animation
        setTimeout(() => setShake(false), 500); // Remove the class after the animation
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
                triggerError(errorData.detail || "Authentication failed!");
                // setError(errorData.detail || "Authentication failed!");
            }
        } catch (error) {
            setLoading(false);
            triggerError("An error occurred. Please try again later.");
            // setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>

            <form onSubmit={handleSubmit}>
                <h1>Login</h1>

                <div className={styles.inputBox}>
                    <input
                        className={styles.usernameInput}
                        placeholder="Username" 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                        required 
                    />
                    <i className='bx bxs-user'></i>
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
                    <i className='bx bxs-lock' ></i>
                </div>

                <div className={styles.rememberForgot}>
                    <label htmlFor="rememberMe">
                        <input type="checkbox" name="rememberMe" />Remember Me
                    </label>
                    <a href="#">Forgot Password?</a>
                </div>

                <div className={styles.loginContainer}>
                    <button
                        type="button"
                        disabled={loading}
                        onClick={handleSubmit}
                        className={`${styles.btn} ${loading ? styles.loading : ""} ${error ? styles.shake : ""}`}
                    >
                        {loading ? (
                            <>
                                <FadeLoader 
                                    size={10} 
                                    color={"#ffffff"} 
                                    loading={loading} 
                                    className={styles.spinner} 
                                /> 
                                Login....
                            </>
                            ) : (
                            "Login"
                            )}
                    </button>
                    
                    {error && <p className={styles.errorMessage}>Invalid credentials, please try again.</p>}
                </div>

                <div className={styles.registerLink}>
                    <p>Don't have an account? <Link to="/register" className={styles.registerPageLink}>Register</Link></p>
                </div> 
            </form>

        </div>
    )
}

export default LoginPage;
