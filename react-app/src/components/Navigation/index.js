import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import Logo from "../../assets/slick_logo.png";
import LoginModal from "./aux/LoginModal";
function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-container">
      <div className="navLogoName">
        <img className="logo" src={Logo} alt="Slick Logo" />
        <NavLink exact to="/">
          Sluck
        </NavLink>
      </div>

      {isLoaded && (
        <>
          {sessionUser ? (
            <div>
              <div className='login-button' onClick={() => dispatch(logout())}>Log Out</div>
            </div>
          ) : (
            <>
              <div className='login-menu'>
                <div className='login-button' onClick={() => setModalState('Login')}>Login</div>

                <div className='register-button' onClick={() => setModalState('Register')}>Register</div>
                <div className='demo-user-button' onClick={() => setModalState('Demo')}>Demo User</div>
              </div>
              {modalState == 'Login' &&
                <div className='login-modal'><LoginModal type="Login" closeSelf={() => setModalState(false)} /></div>}

              {modalState == 'Register' &&
                <div className='login-modal'><LoginModal type="Register" closeSelf={() => setModalState(false)} /> </div>}
              {modalState == 'Demo' &&
                <div className='login-modal'> <LoginModal type="Demo" closeSelf={() => setModalState(false)} /></div>}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Navigation;
