import './MainWindowHeader.css';
import SearchBar from './aux/SearchBar';
import { useSelector } from 'react-redux';
import ProfileIcon from './aux/ProfileIcon';

import React, { useEffect, useState } from "react";


function MainWindowHeader() {
  const user = useSelector(state => state.session.user);


  return <div className="main-window-header">
    <div />
    <SearchBar />
    <ProfileIcon user={user} />

    <>

    </>

  </div>
}
export default MainWindowHeader;
