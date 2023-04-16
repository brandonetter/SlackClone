import React from "react";
import "./ChannelModal.css";
import { useState } from 'react';
import ChannelDetail from "../ChannelDetail/ChannelDetail";
import EditChannelForm from "../ChannelForm/EditChannelForm";

function Modal({ setOpenModal }) {

  const [show, setShow] = useState(false);
  return (
    <div className="ChannelmodalBackground">
      <div className="ChannelmodalContainer">
        <div className="titleCloseBtn">
          <button className="channelXbttn"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            x
          </button>
        </div>

        <div className="body">
          <ChannelDetail/>
        </div>
        <div className="channelmodal">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            className="channeldetailclosebtn"
          >
            Close
          </button>

          <div className="editchannelform">

          <button className="editChannelExpand" onClick={() => setShow(!show)}>
           {show ? 'Edit Channel' : 'Edit Channel'}
         </button>
           {show && <hr />}
           {show &&

           <div className="EditChannelForm">
            < EditChannelForm/>
            </div>
            }

          </div>

        </div>


      </div>
    </div>
  );
}

export default Modal
