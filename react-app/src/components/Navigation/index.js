import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    history.push(`/products?search=${encodeURIComponent(searchInput)}`);
  };

  return (
    <>
      <div id="nav-bar">
        <div id="dogsy">
          <NavLink exact to="/">
            <h1 id="dogsy-title">Dogsy</h1>
          </NavLink>
        </div>
        <div className="searchbar">
          <form onSubmit={handleSearchSubmit}>
            <input
              className="searchbar-input"
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search for anything"
            />
            <button type="submit">
              <i className="fas fa-search" style={{ color: "white" }}></i>
            </button>
          </form>
        </div>
        <div id="right-side-nav">
          <NavLink id="all-listings-nav-bar" exact to="/products">
            All Products
          </NavLink>
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
