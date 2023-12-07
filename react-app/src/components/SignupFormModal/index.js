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
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!username)
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Please enter a username",
      }));

    if ((username && username.length < 5) || username.length > 25)
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Please enter a username between 5 and 25 characters",
      }));
    if (!email)
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter an email address",
      }));
    if (email && !email.includes("@"))
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter an email address with the '@' symbol",
      }));
    if (email && !email.endsWith(".com"))
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter an email address ending in '.com'",
      }));
    if (!firstName)
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "Please enter a first name",
      }));
    if ((firstName && firstName.length < 3) || firstName.length > 25)
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "Please enter a first name between 3 and 25 characters",
      }));
    if (!lastName)
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "Please enter a last name",
      }));
    if ((lastName && lastName.length < 3) || lastName.length > 25)
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "Please enter a last name between 3 and 25 characters",
      }));
    if (!password)
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Please enter a password",
      }));
    if (password && password.length < 5)
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Please enter a password longer than 5 characters",
      }));
    if (password && password !== confirmPassword)
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Passwords do not match",
      }));

    // if (errorsObj.length > 0) {
    //   setErrors(errorsObj);
    //   return;
    // }

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
        setErrors((prevErrors) => ({ ...prevErrors, ...data }));
      } else {
        closeModal();
        setSubmit(true);
      }
    }
    // else {
    //   setErrors((prevErrors) => ({

    //     password: "Passwords do not match",
    //   }));
    // }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {/* <div>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div> */}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username ? <div>{errors.username}</div> : null}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email ? <div>{errors.email}</div> : null}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName ? <div>{errors.firstName}</div> : null}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName ? <div>{errors.lastName}</div> : null}
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
        {errors.password ? <div>{errors.password}</div> : null}
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
