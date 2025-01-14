import '../css/RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>Register</h1>

        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <i className="bx bxs-user"></i>
        </div>

        <div className="input-box">
          <input type="email" placeholder="Email" required />
          <i className="bx bxs-envelope"></i>
        </div>

        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <i className="bx bxs-lock"></i>
        </div>

        <div className="input-box">
          <input type="password" placeholder="Confirm Password" required />
          <i className="bx bxs-lock"></i>
        </div>

        <div className="remember-forgot">
          <label>
            <input type="checkbox" className="check-box" /> I agree to all statements in
          </label>
          <a href="#">Terms of service</a>
        </div>

        <button type="submit" className="btn">
          Register
        </button>

        <div className="register-link">
          <p>
            Already have an account? <a href="#">Login here</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
