import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [submit, setSubmit] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const loginAsDemoUser = (e) => {
    e.preventDefault();
    const demoEmail = "rae@aa.io";
    const demoPassword = "password";
    return dispatch(login(demoEmail, demoPassword))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          console.log("🚀🚀🚀🚀🚀🚀 ~ data.errors:", data.errors);
        }
      });
  };

  return (
    <>
      <div id="login-modal-parent">
        <form id="login-modal" onSubmit={handleSubmit}>
          <h1
          // style={{ paddingTop: "10px" }}
          >
            Log In
          </h1>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>
                <p id="errors" style={{ padding: "5px", fontWeight: "bold" }}>
                  {error}
                </p>
              </li>
            ))}
          </ul>
          <label>
            Email
            <input
              style={{ display: "flex", width: "300px" }}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <p>{errors.email}</p>
          <label>
            Password
            <input
              style={{ display: "flex", width: "300px" }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div id="login-and-demo-login-parent-div">
            <button id="login-only-button" type="submit" onClick={handleSubmit}>
              Log In
            </button>
            <button id="login-as-demo-user" onClick={loginAsDemoUser}>
              Log in as Demo User
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
