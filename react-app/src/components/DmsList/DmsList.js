import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, Route, useParams, useHistory } from 'react-router-dom';

import { getDms, loadDms, deleteDms } from '../../store/dms';

import { getChannel, deleteChannel } from '../../store/channels';

import { changeRoom } from '../../store/channel';
import './DmsList.css'

const DmsBrowser = () => {
  const dispatch = useDispatch()


  const sessionUser = useSelector((state) => state.session.user);


  const dmsobj = useSelector(state => state.channels)

  const dmsArr = Object.values(dmsobj)

  function changeRoomHandler(room) {
    dispatch(changeRoom(room))
  }


  const RoomtypeDms = []

  dmsArr.map((dms) => {
    if (dms.roomtype == "DM") {
      RoomtypeDms.push(dms)
    }

  })

  const deleteHandler = (id) => {
    dispatch(deleteDms(parseInt(id)))
  }

  useEffect(() => {
    dispatch(getChannel())
  }, [dispatch])

  const [show, setShow] = useState(false);


  return sessionUser.id ? (
    <>

      {dmsobj &&
        <main className='DmsListContainer'>
          <div className='eachDms'>
            {RoomtypeDms.map((dms) => (

              <Link className='dmsLink' key={dms.id} to={`/chat/${dms.id}`} onClick={() => changeRoomHandler(dms)}>
                {dms.name}

                <button className="dmsLinkexpandBtn" onClick={() => setShow(!show)}>
                  {show ? '...' : '...'}
                </button>
                {show && <hr />}
                {show &&
                  <button className='deletedmsbtn' id={dms.id} onClick={(e) => deleteHandler(e.target.id)}>Delete</button>
                }

              </Link>
            ))}

          </div>
        </main >
      }

    </>
  ) :
    null;


}

export default DmsBrowser
