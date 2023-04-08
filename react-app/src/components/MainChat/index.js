import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { joinDefaultRoom, getUsersInRoom } from "../../store/channel";
import { useSelector } from "react-redux";
import MainChatInput from "../MainChatInput";
import defaultIcon from "../../assets/defaultIcon.png";
import "./MainChat.css";

import ChatMessage from "./component/ChatMessage";


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
  const [loading, setLoading] = useState(false);
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
      socket.emit("get-room-messages", "latest");
    });
    socket.on("room-messages", (messages) => {
      if (!timeout) {
        setTime(true);
      }
      setMessages(messages);
    });
    socket.on("room-messages-append", (message) => {
      setLoading(false);
      console.log(message);
      if (message[0]?.noMessage) return;
      setMessages((messages) => [...message, ...messages].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i));
    });

    if (socket && currentChannel) {
      socket.emit("get-room-messages", "latest");
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
      socket.emit("get-room-messages", "latest");
    }, 50000);

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

  function checkScroll(e) {
    // check if the user is at the top of the chat
    let element = e.target;
    if (element.scrollTop === 0) {
      console.log("top");
      // get the id of the first message in the chat
      let firstMessageId = formattedMessages[1].id;
      socket.emit("get-room-messages", firstMessageId);
      setLoading(true);
    }
  }

  return (
    <div className="main-chat-container">

      <div className="main-chat" onScroll={checkScroll}>
        <div className="main-chat-header">
          {currentChannel && <h1 className='chat-room-name'>{currentChannel.name}</h1>}
          <div className='main-chat-user-list'>
            <img className='main-chat-user-list-icon' src={defaultIcon} alt='user icon' />
            {currentUsers && currentUsers.length} Users

          </div>
        </div>
        <div className='main-chat-messages'>
          {loading && 'Loading Messages...'}
          {formattedMessages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}
        </div>
      </div>
      <br />
      <div className="main-chat-text-box">


        <MainChatInput socket={socket} />
      </div>
    </div >
  );
}
export default MainChat;
