import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { joinDefaultRoom } from "../../store/channel";
import { useSelector } from "react-redux";
import MainChatInput from "../MainChatInput";
import "./MainChat.css";
// disconnect socket on unmount

function MainChat() {
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.channel.room);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (!socket) {
      setSocket(io());
      //   dispatch(joinDefaultRoom());
    }
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }, [socket]);

  return (
    <div className="main-chat-container">
      <div className="main-chat">{currentChannel && <h3>{currentChannel.name}</h3>}</div>
      <div className="main-chat-text-box">


        <MainChatInput />
      </div>
    </div>
  );
}
export default MainChat;
