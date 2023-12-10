import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useModal } from "../../context/Modal";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { closeModal } = useModal();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
    history.push("/");
  };

  const handleCreateNewListing = (e) => {
    closeMenu();
    history.push("/products/new");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => {
    setShowMenu(false);
    // closeModal();
  };

  return (
    <>
      <button className="login-button" onClick={openMenu}>
        <i className="fas fa-user-circle" />
        <i className="fa-solid fa-caret-down"></i>
        {/* <i class="fa-solid fa-dog"></i> */}
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li
              style={{
                fontSize: "20px",
                fontWeight: "600",
                paddingBottom: "5px",
              }}>
              Welcome, {user.first_name}!
            </li>
            <li
              style={{
                paddingBottom: "5px",
              }}>
              <button
                id="create-listing-dropdown-button"
                onClick={handleCreateNewListing}>
                Create a new listing
              </button>
            </li>
            <li
              style={{
                paddingBottom: "5px",
              }}>
              <button id="logout-dropdown-button" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <div id="login-signup-parent">
              {/* <div id="open-modal-login"> */}
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              {/* </div> */}
              {/* <div id="open-modal-signup"> */}
              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              {/* </div> */}
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
