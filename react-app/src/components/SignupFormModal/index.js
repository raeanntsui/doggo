import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp, authenticate } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorsObj = {};

    // email validation
    if (!email) errorsObj.email = "Please enter an email address";
    if (email && !email.includes("@"))
      errorsObj.email = "Email must contain @ symbol";
    if (email && !email.endsWith(".com"))
      errorsObj.email = "Email must end in .com";

    // username validation
    if (!username) errorsObj.username = "Please enter a username";
    if ((username && username.length < 5) || username.length > 25)
      errorsObj.username =
        "Please enter a username between 5 and 25 characters long";

    // first name validation
    if (!firstName) errorsObj.firstName = "Please enter your first name";
    if ((firstName && firstName.length < 3) || firstName.length > 25)
      errorsObj.firstName = "Please enter a name between 3 and 25 characters";

    // last name validation
    if (!lastName) errorsObj.lastName = "Please enter your last name";
    if ((lastName && lastName.length < 3) || lastName.length > 25)
      errorsObj.lastName = "Please enter a name between 3 and 25 characters";

    // password validation
    if (!password) errorsObj.password = "Please enter a password";
    if (password && password.length < 6)
      errorsObj.password = "Please enter a password longer than 6 characters";
    if (password !== confirmPassword)
      errorsObj.confirmPassword = "Passwords must match";

    if (Object.values(errorsObj).length > 0) {
      setErrors(errorsObj);
      return;
    }

    if (password === confirmPassword) {
      setErrors({});
      const res = await dispatch(
        signUp({
          username,
          email,
          first_name: firstName,
          last_name: lastName,
          password,
        })
      ).catch((res) => res);
      if (res && res[0].startsWith("email")) {
        const errorsObj_email = { email: res[0].slice(8) };
        setErrors(errorsObj_email);
      } else {
        dispatch(authenticate());
        history.push("/products");
        closeModal();
      }
    } else {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
  };

  return (
    <>
      <div id="signup-modal-parent">
        <form id="signup-modal" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <label>
            Email
            <div id="errors">{errors.email && <p>{errors.email}</p>}</div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
          </label>
          <label>
            Username
            <div id="errors">
              {" "}
              {errors.username && <p>{errors.username}</p>}
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              // required
            />
          </label>

          <label>
            First Name
            <div id="errors">
              {errors.firstName && <p>{errors.firstName}</p>}
            </div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              // required
            />
          </label>

          <label>
            Last Name
            <div id="errors">
              {" "}
              {errors.lastName && <p>{errors.lastName}</p>}
            </div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              // required
            />
          </label>
          <label>
            Password
            <div id="errors">
              {" "}
              {errors.password && <p>{errors.password}</p>}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
            />
          </label>
          <label>
            Confirm Password
            <div id="errors">
              {" "}
              {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              // required
            />
          </label>
          <div id="signup-modal-button-div">
            <button id="signup-modal-button" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
