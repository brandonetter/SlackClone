import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { joinDefaultRoom, getUsersInRoom } from "../../store/channel";
import { useSelector } from "react-redux";
import MainChatInput from "../MainChatInput";
import defaultIcon from "../../assets/defaultIcon.png";
import "./MainChat.css";
// import marked

import ChatMessage from "./component/ChatMessage";
// disconnect socket on unmount

function MainChat() {
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.channel.room);
  const currentUsers = useSelector((state) => state.channel.users);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [formattedMessages, setFormattedMessages] = useState([]);
  const [timeout, setTime] = useState(null);
  const [scrollLock, setScrollLock] = useState(true);
  const [users, setUsers] = useState([]);
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
      dispatch(getUsersInRoom(currentChannel.id));

    }


  }, [socket, currentChannel]);

  useEffect(() => {
    if (!currentUsers) return;
    setUsers(currentUsers);
  }, [currentUsers]);

  useEffect(() => {
    if (!socket) return;
    setInterval(() => {
      socket.emit("get-room-messages");
    }, 5000);

  }, [timeout]);

  useEffect(() => {
    // add an empty message between messages when the day changes
    let newMessages = [];
    let lastDate = null;
    messages.forEach((message) => {
      let date = new Date(message.date);
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let newDate = `${month}/${day}/${year}`;
      if (lastDate !== newDate) {
        newMessages.push({ isDate: true, date: newDate, id: newDate });
      }
      newMessages.push(message);
      lastDate = newDate;
    });

    // check if the user is at the bottom of the chat
    let element = document.querySelector(".main-chat");
    if (element.scrollHeight - element.scrollTop - 1 <= element.clientHeight) {
      setScrollLock(true);
    } else {
      setScrollLock(false);
    }

    setFormattedMessages(newMessages);

  }, [messages]);
  useEffect(() => {
    // scroll to bottom of chat once the formatted messages are updated
    // if the user is at the bottom of the chat already
    let element = document.querySelector(".main-chat");
    if (scrollLock) {
      element.scrollTop = element.scrollHeight;
    }
  }, [formattedMessages]);

  return (
    <div className="main-chat-container">

      <div className="main-chat">
        <div className="main-chat-header">
          {currentChannel && <h1 className='chat-room-name'>{currentChannel.name}</h1>}
          <div className='main-chat-user-list'>
            <img className='main-chat-user-list-icon' src={defaultIcon} alt='user icon' />
            {currentUsers && currentUsers.length}
            {currentUsers && currentUsers.map((user) => (

              <div className='main-chat-user' key={user.id}>{user.username}</div>

            ))}
          </div>
        </div>
        <div className='main-chat-messages'>
          {formattedMessages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
        </div>
      </div>
      <br />
      <div className="main-chat-text-box">


        <MainChatInput socket={socket} />
      </div>
      {/* {scrollLock && 'lol'} */}
    </div >
  );
}
export default MainChat;
