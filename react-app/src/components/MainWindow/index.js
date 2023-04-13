import MainChat from "../MainChat";
import RoomSidebar from "../RoomSidebar";
import MainWindowHeader from "../MainWindowHeader";

import "./MainWindow.css";
import ProfileModal from "./aux/ProfileModal";
import StatusModal from "./aux/StatusModal";
import { useSelector } from "react-redux";
function MainWindow() {
  const modals = useSelector((state) => state.modals);
  console.log(modals);
  return (
    <>
      <div className="main-window-container">
        <MainWindowHeader />
        <div className="main-window">

          <RoomSidebar />
          <MainChat />
        </div>
      </div>

      {/*
      POPUP AND MODAL CONTROL. SEE AUX FOLDER FOR MODAL COMPONENTS
      AND MODALS SLICE FOR REDUX LOGIC
      */}
      <div className="main-window-modal">
        {modals.status && <div className="main-window-modal-status">
          <StatusModal />
        </div>}
        {modals.search && <div className="main-window-modal-search">
        </div>}
        {modals.profile &&
          <div className="main-window-modal-profile">
            <ProfileModal />
          </div>}
      </div>
    </>
  );
}
export default MainWindow;
