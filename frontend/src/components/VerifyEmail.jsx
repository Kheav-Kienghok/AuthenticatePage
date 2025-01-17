import React, { useEffect, useState } from "react";
import styles from "../css/VerifyEmail.module.css";

const VerifyEmail = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    document.querySelector("input").focus();
  }, []);

  const handleInputChange = (event, index) => {
    const value = event.target.value;
    const updatedValues = [...otpValues];

    if (value.length > 1) {
      updatedValues[index] = "";
    } else {
      updatedValues[index] = value;
    }

    setOtpValues(updatedValues);

    if (value && index < otpValues.length - 1) {
      document.querySelectorAll("input")[index + 1].removeAttribute("disabled");
      document.querySelectorAll("input")[index + 1].focus();
    }

    // Check if all inputs are filled to activate the button
    setIsButtonActive(updatedValues.every((val) => val !== ""));
  };

  const handleBackspace = (event, index) => {
    if (event.key === "Backspace" && index > 0) {
      const updatedValues = [...otpValues];
      updatedValues[index] = "";
      setOtpValues(updatedValues);

      const inputs = document.querySelectorAll("input");
      inputs[index].setAttribute("disabled", true); 
      inputs[index - 1].focus(); 
    }
  };

  return (
    <div className={styles.containers}>
      <header>
        <i className="bx bxs-check-shield"></i>
      </header>

      <h4>Enter OTP Code</h4>

      <form>
        <div className={styles.inputField}>
          {otpValues.map((value, index) => (
            <input
              key={index}
              type="number"
              value={value}
              disabled={index !== 0 && otpValues[index - 1] === ""}
              onChange={(event) => handleInputChange(event, index)}
              onKeyUp={(event) => handleBackspace(event, index)}
            />
          ))}
        </div>

        <button disabled={!isButtonActive} className={isButtonActive ? styles.active : ""}>
          Verify OTP
        </button>

        <p>
          Don't get the code? <a href="#">Resend</a>
        </p>
      </form>
    </div>
  );
};

export default VerifyEmail;