import "./DmsModal.css"
import React from "react";
import { useState } from 'react';
import DmsDetail from "../DmsDetail/DmsDetail";
import EditDmsForm from "../DmsForm/EditDmsForm";


function DmsModal({ setOpenModal }) {

    const [show, setShow] = useState(false);
    return (
      <div className="DmsModalBackground">
        <div className="DmsModalContainer">
          <div className="titleCloseBtn">
            <button className="DmsXbttn"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              x
            </button>
          </div>

          <div className="body">
            <DmsDetail/>
          </div>
          <div className="DmsModal">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              className="Dmsdetailclosebtn"
            >
              Close
            </button>

            <div className="editdmsform">

            <button className="editDmsExpand" onClick={() => setShow(!show)}>
             {show ? 'Edit' : 'Edit'}
           </button>
             {show && <hr />}
             {show &&

             <div className="EditDmsForm">
              < EditDmsForm/>
              </div>
              }

            </div>

          </div>


        </div>
      </div>
    );
  }

  export default DmsModal
