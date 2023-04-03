import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import Logo from "../../assets/slick_logo.png";
function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-container">
      <div className="navLogoName">
        <img className="logo" src={Logo} alt="Slick Logo" />
        <NavLink exact to="/">
          SlackClone
        </NavLink>
      </div>

      {isLoaded && (
        <>
          {sessionUser ? (
            <div>
              {sessionUser.username}
              <button onClick={() => dispatch(logout())}>Log Out</button>
            </div>
          ) : (
            <NavLink to="/login">Log In</NavLink>
          )}
        </>
      )}
    </div>
  );
}

export default Navigation;
