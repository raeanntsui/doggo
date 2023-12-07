import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [submit, setSubmit] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorsArray = [];

    if (!username) errorsArray.push("Please enter a username");
    if (username && (username.length < 5 || username.length > 25))
      errorsArray.push(
        "Please enter a username between 5 and 25 characters long"
      );
    if (!email) errorsArray.push("Please enter an email address");
    if (email && !email.includes("@"))
      errorsArray.push("Please enter an email address with the '@' symbol");
    if (email && !email.endsWith(".com"))
      errorsArray.push("Please enter an email address ending in '.com'");
    if (!firstName) errorsArray.push("Please enter a first name");
    if (firstName && firstName.length < 3)
      errorsArray.push("Please enter a first name longer than 3 characters");
    if (!lastName) errorsArray.push("Please enter a last name");
    if (lastName && lastName.length < 3)
      errorsArray.push("Please enter a last name longer than 3 characters");
    if (password && password.length < 6)
      errorsArray.push("Please enter a password longer than 6 characters");
    if (password !== confirmPassword) {
      errorsArray.push("Passwords do not match");
    }

    if (errorsArray.length > 0) {
      setErrors(errorsArray);
      return;
    }

    if (password === confirmPassword) {
      const data = await dispatch(
        signUp({
          username,
          email,
          first_name: firstName,
          last_name: lastName,
          password,
        })
      );
      if (data) {
        setErrors(data);
      } else {
        closeModal();
        setSubmit(true);
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <p>{errors.username}</p>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <p>{submit && errors.email}</p>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <p>{submit && errors.firstName}</p>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <p>{submit && errors.lastName}</p>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <p>{submit && errors.password}</p>
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
