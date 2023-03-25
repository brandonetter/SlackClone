import MainChat from "../MainChat";
import RoomSidebar from "../RoomSidebar";
import "./MainWindow.css";
function MainWindow() {
  return (
    <div className="main-window">
      <RoomSidebar />
      <MainChat />
    </div>
  );
}
export default MainWindow;
