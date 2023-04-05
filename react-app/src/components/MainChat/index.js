import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { joinDefaultRoom } from "../../store/channel";
import { useSelector } from "react-redux";
import MainChatInput from "../MainChatInput";
import "./MainChat.css";
import defaultIcon from "../../assets/defaultIcon.png";
// disconnect socket on unmount

function MainChat() {
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.channel.room);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [timeout, setTime] = useState(null);
  const [scrollLock, setScrollLock] = useState(true);
  useEffect(() => {
    if (!socket) {
      setSocket(io());
      // dispatch(joinDefaultRoom());
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
    socket.on("message-incoming", (message) => {
      console.log('aaa');
      socket.emit("get-room-messages");
    });
    socket.on("room-messages", (messages) => {
      if (!timeout) {
        setTime(true);
      }
      setMessages(messages);
    });
    if (socket && currentChannel) {
      socket.emit("get-room-messages");

    }

  }, [socket, currentChannel]);

  useEffect(() => {
    if (!socket) return;
    setInterval(() => {
      socket.emit("get-room-messages");
    }, 5000);

  }, [timeout]);


  // Handle locking the scroll
  // of the chat to the bottom
  // unless the user moves the scroll to the bottom
  useEffect(() => {
    let element = document.querySelector(".main-chat");

    function lockScroll() {
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        setScrollLock(true);
      } else {
        setScrollLock(false);
      }
    }
    element.addEventListener('scroll', lockScroll);

    function updateScroll(element) {
      element.scrollTop = element.scrollHeight;
    }
    let id = setInterval(() => {
      if (scrollLock) {
        updateScroll(element);
      }
    }, 100);
    return () => {
      clearInterval(id);
      element.removeEventListener('scroll', lockScroll);
    }
  });
  return (
    <div className="main-chat-container">
      <div className="main-chat">
        {currentChannel && <h3 className='chat-room-name'>{currentChannel.name}</h3>}
        {messages.map((message) => (
          <div key={message.id} className="chat-message">
            <div className="chat-message-icon">
              {message.profileicon ? <img src={message.profileicon} alt="profile icon" /> : <img src={defaultIcon} alt="profile icon" />}
            </div>
            <div className="chat-message-content">
              <h4>{message.username}</h4>
              <p>{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="main-chat-text-box">


        <MainChatInput socket={socket} />
      </div>
    </div>
  );
}
export default MainChat;
