import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  console.log("🚀🚀🚀🚀🚀🚀 ~ sessionUser:", sessionUser);

  return (
    <div id="nav-bar">
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/products">
            Products
          </NavLink>
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
        {sessionUser ? (
          <>
            <h1>Hello, {sessionUser.first_name}</h1>
            <h1>sessionUser.id: {sessionUser.id}</h1>
          </>
        ) : (
          <h1>You are not logged in</h1>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
