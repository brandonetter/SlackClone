import './MainWindowHeader.css';
import SearchBar from './aux/SearchBar';
import { useSelector } from 'react-redux';
import ProfileIcon from './aux/ProfileIcon';
import ChannelDetail from '../ChannelDetail/ChannelDetail';
import Modal from "../ChannelModal/ChannelModal";
import React, { useEffect, useState } from "react";



function MainWindowHeader() {
    const user = useSelector(state => state.session.user);
    const [modalOpen, setModalOpen] = useState(false);

    return <div className="main-window-header">
        <div />
        <SearchBar />
        <ProfileIcon user={user} />

        <>
<div className="App">
      <p>View Channel Details</p>
      <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
       Channel Details
      </button>

      {modalOpen && <Modal setOpenModal={setModalOpen} />}
    </div>
  </>


    </div>
}
export default MainWindowHeader;
