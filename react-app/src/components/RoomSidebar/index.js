import { useDispatch } from "react-redux";
import { joinDefaultRoom } from "../../store/channel";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./RoomSidebar.css";
import ChannelBrowser from "../ChannelList/ChannelList";
import CreateChannelForm from "../ChannelForm/CreateChannelForm";
import { getChannel } from "../../store/channels";
// import ChannelList "../ChannelList"

function RoomSidebar() {
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.channel.room);
  useEffect(() => {
    dispatch(getChannel());
    if (!currentChannel) dispatch(joinDefaultRoom());
  });

  return (
    <div className="room-sidebar">
      <div className="room-sidebar-header">
        <h2>Current Channel:</h2>
        <ChannelBrowser/>
        <CreateChannelForm/>
        {currentChannel && <h3>{currentChannel.name}</h3>}
      </div>
    </div>
  );
}
export default RoomSidebar;
