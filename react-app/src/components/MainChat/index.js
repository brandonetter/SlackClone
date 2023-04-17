import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { joinDefaultRoom, getUsersInRoom, deleteMessage, updateMessage } from "../../store/channel";
import { useSelector } from "react-redux";
import MainChatInput from "../MainChatInput";
import defaultIcon from "../../assets/defaultIcon.png";
import "./MainChat.css";
import Modal from "../ChannelModal/ChannelModal";
import DmsModal from "../DmsModal/DmsModal";


import ChatMessage from "./component/ChatMessage";


function MainChat() {
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.channel.room);
  const currentUsers = useSelector((state) => state.channel.users);
  const sessionUser = useSelector((state) => state.session.user);
  const [intervalId, setIntervalId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [formattedMessages, setFormattedMessages] = useState([]);
  const [timeout, setTime] = useState(null);
  const [scrollLock, setScrollLock] = useState(true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [redirect, setRedirect] = useState(null);
  useEffect(() => {
    if (!socket) {
      setSocket(io());
      //dispatch(joinDefaultRoom());
    }
  }, []);
  useEffect(() => {
    setMessages([]);
    clearInterval(intervalId);

  }, [currentChannel]);
  useEffect(() => {

    if (!socket) return;
    socket.on("message-incoming", (message) => {
      socket.emit("get-room-messages", { channelId: currentChannel.id, message: "latest" });
    });
    socket.on("room-messages", (message) => {
      if (message.length === 0) {
        // force a rerender
        setRedirect(<Redirect to="/chat-session-reload" />);
      }
      if (!timeout) {
        setTime(true);
      }
      setMessages((messages) => [...messages, ...message].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i));

    });
    socket.on("room-messages-append", (message) => {

      if (message[0]?.noMessage) {
        setLoadingMessage("No more messages");
        return;
      }
      setTimeout(() => {
        setLoading(false);
        setMessages((messages) => [...message, ...messages].filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i));
      }, 300);
    });

    if (socket && currentChannel) {
      socket.emit("get-room-messages", { channelId: currentChannel.id, message: "latest" });
      dispatch(getUsersInRoom(currentChannel.id));

    }
    return () => {
      socket.off("message-incoming");
      socket.off("room-messages");
      socket.off("room-messages-append");
    };


  }, [socket, currentChannel]);

  useEffect(() => {
    if (!currentUsers) return;
    setUsers(currentUsers);
  }, [currentUsers]);

  useEffect(() => {
    if (!socket) return;
    let id = setInterval(() => {

      socket.emit("get-room-messages", { channelId: currentChannel.id, message: "latest" });
    }, 5000);
    setIntervalId(id);

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
      // console.log("top");
      // get the id of the first message in the chat
      let firstMessageId = formattedMessages?.[1]?.id;
      socket.emit("get-room-messages", { channelId: currentChannel.id, message: firstMessageId });
      setLoading(true);
    }
  }
  async function tryEditMessage(messageId, content) {
    let res = await dispatch(updateMessage(messageId, content));
    if (res.message === 'Message edited') {
      // edit message locally
      let message = messages.find((message) => message.id === messageId);
      if (!message) return;
      message.message = content;
      setMessages((messages) => messages.map((message) => message.id === messageId ? message : message));
    } else {
      // failure, handle toast popup or whatever
      // maybe later
    }
  }
  async function tryDeleteMessage(messageId) {

    let res = await dispatch(deleteMessage(messageId));
    if (res.message === 'Message deleted') {
      // delete a message from the chat locally
      let message = messages.find((message) => message.id === messageId);
      if (!message) return;
      message.message = "*message deleted*";
      setMessages((messages) => messages.map((message) => message.id === messageId ? message : message));
    } else {
      // failure, handle toast popup or whatever
      // maybe later
    }

  }

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="main-chat-container">
      {redirect}
      <div className="main-chat" onScroll={checkScroll}>
        {messages.length > 0 ? (
          <div className="main-chat-header">
            {currentChannel && <h1 className='chat-room-name'>{currentChannel.name} </h1>}


            <div className="ChannelDetailModalContainer">
              <button
                className="openChannelModalBtn"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                View Details
              </button>

              {modalOpen && <Modal setOpenModal={setModalOpen} />}
            </div>

            {/* <div className="DmsDetailModalContainer">
          <button
            className="openDmsModalBtn"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Chat Details
          </button>

          {modalOpen && <Modal setOpenModal={setModalOpen} />}
          </div> */}


            <div className='main-chat-user-list'>
              <img className='main-chat-user-list-icon' src={defaultIcon} alt='user icon' />
              {currentUsers && currentUsers.length} Users

            </div>
          </div>
        ) : (
          <div className="main-chat-suspense-header">
            <div className="main-chat-suspense-header-text"></div>
          </div>
        )}
        <div className='main-chat-messages'>
          {loading && <span className='chat-loading-message'>{loadingMessage}</span>}
          {formattedMessages.map((message, idx) => (
            <ChatMessage message={message} socket={socket} editMessage={tryEditMessage} deleteMessage={tryDeleteMessage} user={sessionUser} key={idx} />
          ))}

        </div>
      </div>
      {messages.length === 0 && (
        <div className="main-chat-suspense">


          <div className="main-chat-suspense-message-holder">
            <div className="main-chat-suspense-profile-icon"></div>
            <div className="main-chat-suspense-text-holder">
              <div className="main-chat-suspense-text"></div>

              <div className="main-chat-suspense-text mcshort"></div>
            </div>
          </div>
          <div className="main-chat-suspense-message-holder">
            <div className="main-chat-suspense-profile-icon"></div>
            <div className="main-chat-suspense-text-holder">
              <div className="main-chat-suspense-text"></div>

              <div className="main-chat-suspense-text mcshort"></div>
            </div>
          </div>
          <div className="main-chat-suspense-message-holder">
            <div className="main-chat-suspense-profile-icon"></div>
            <div className="main-chat-suspense-text-holder">
              <div className="main-chat-suspense-text"></div>

              <div className="main-chat-suspense-text mcshort"></div>
            </div>
          </div>
          <div className="main-chat-suspense-message-holder">
            <div className="main-chat-suspense-profile-icon"></div>
            <div className="main-chat-suspense-text-holder">
              <div className="main-chat-suspense-text"></div>

              <div className="main-chat-suspense-text mcshort"></div>
            </div>
          </div>
          <div className="main-chat-suspense-message-holder">
            <div className="main-chat-suspense-profile-icon"></div>
            <div className="main-chat-suspense-text-holder">
              <div className="main-chat-suspense-text"></div>

              <div className="main-chat-suspense-text mcshort"></div>
            </div>
          </div>
          <div className="main-chat-suspense-message-holder">
            <div className="main-chat-suspense-profile-icon"></div>
            <div className="main-chat-suspense-text-holder">
              <div className="main-chat-suspense-text"></div>

              <div className="main-chat-suspense-text mcshort"></div>
            </div>
          </div>
          <div className="main-chat-suspense-message-holder">
            <div className="main-chat-suspense-profile-icon"></div>
            <div className="main-chat-suspense-text-holder">
              <div className="main-chat-suspense-text"></div>

              <div className="main-chat-suspense-text mcshort"></div>
            </div>
          </div>
        </div>
      )}
      <br />
      <div className="main-chat-text-box">


        <MainChatInput socket={socket} />
      </div>
    </div >
  );
}
export default MainChat;
