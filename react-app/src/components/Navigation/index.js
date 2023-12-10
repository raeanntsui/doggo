import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <div id="nav-bar">
        <div id="dogsy">
          <NavLink exact to="/">
            <h1 id="dogsy-title">Dogsy</h1>
          </NavLink>
        </div>
        <div id="right-side-nav">
          {/* <div id="all-listings-link"> */}
          <NavLink
            style={{
              fontWeight: "700",
              fontSize: "20px",
            }}
            exact
            to="/products">
            All Listings
          </NavLink>
          {/* </div> */}
          <div id="profile-button">
            {isLoaded && (
              <li>
                <ProfileButton user={sessionUser} />
              </li>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
