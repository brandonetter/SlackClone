import { useDispatch } from "react-redux";
import { joinDefaultRoom } from "../../store/channel";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./RoomSidebar.css";
function RoomSidebar() {
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.channel.room);
  useEffect(() => {
    if (!currentChannel) dispatch(joinDefaultRoom());
  });

  return (
    <div className="room-sidebar">
      <div className="room-sidebar-header">
        <h2>Current Channel:</h2>
        {currentChannel && <h3>{currentChannel.name}</h3>}
      </div>
    </div>
  );
}
export default RoomSidebar;
