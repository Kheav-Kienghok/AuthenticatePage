import styles from '../css/RegisterPage.module.css';
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div className={styles.wrapper}>
      <form action="">
        <h1>Register</h1>

        <div className={styles.inputBox}>
          <input type="text" placeholder="Username" required />
          <i className="bx bxs-user"></i>
        </div>

        <div className={styles.inputBox}>
          <input type="email" placeholder="Email" required />
          <i className="bx bxs-envelope"></i>
        </div>

        <div className={styles.inputBox}>
          <input type="password" placeholder="Password" required />
          <i className="bx bxs-lock"></i>
        </div>

        <div className={styles.inputBox}>
          <input type="password" placeholder="Confirm Password" required />
          <i className="bx bxs-lock"></i>
        </div>

        <div className={styles.remeberForgot}>
          <label>
            <input type="checkbox" className={styles.checkBox} /> I agree to all statements in
          </label>
          <a href="#">Terms of service</a>
        </div>

        <button type="submit" className={styles.btn}>
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
