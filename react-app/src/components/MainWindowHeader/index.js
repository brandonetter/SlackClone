import './MainWindowHeader.css';
import SearchBar from './aux/SearchBar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ProfileIcon from './aux/ProfileIcon';
import { getUserProfileImage } from '../../store/session';
import React, { useEffect, useState } from "react";


function MainWindowHeader() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const profileImage = useSelector(state => state.session.profilePicture);
  useEffect(() => {
    if (!profileImage) {
      dispatch(getUserProfileImage(user.id));
    }
  }, [dispatch, user.id]);

  return <div className="main-window-header">
    <div />
    <SearchBar />
    <ProfileIcon user={user} />

    <>

    </>

  </div>
}
export default MainWindowHeader;
