import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  console.log("🚀🚀🚀🚀🚀🚀 ~ sessionUser:", sessionUser);

  return (
    <>
      <div id="nav-bar">
        <div>
          <NavLink exact to="/">
            Home
          </NavLink>
        </div>
        <div>
          <NavLink exact to="/products">
            Products
          </NavLink>
        </div>
        <div>
          {sessionUser ? (
            <>
              <h5>Hello, {sessionUser.first_name}</h5>
              <h5>sessionUser.id: {sessionUser.id}</h5>
            </>
          ) : (
            <h1>You are not logged in</h1>
          )}
        </div>
        <div>
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </div>
      </div>
    </>
  );
}

export default Navigation;
