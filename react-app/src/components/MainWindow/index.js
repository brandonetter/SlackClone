import MainChat from "../MainChat";
import RoomSidebar from "../RoomSidebar";
import MainWindowHeader from "../MainWindowHeader";

import "./MainWindow.css";
function MainWindow() {
  return (
    <div className="main-window-container">
      <MainWindowHeader />
      <div className="main-window">

        <RoomSidebar />
        <MainChat />
      </div>
    </div>
  );
}
export default MainWindow;
