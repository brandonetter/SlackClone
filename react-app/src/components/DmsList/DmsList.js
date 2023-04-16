import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, Route, useParams, useHistory } from 'react-router-dom';
import { getDms, loadDms } from '../../store/dms';
import { changeRoom } from '../../store/channel';
import './DmsList.css'

const DmsBrowser = () => {
  const dispatch = useDispatch()

  function changeRoomHandler(room) {
    dispatch(changeRoom(room))
  }
  const dmsobj = useSelector(state => state.dms)
  const dmsArr = Object.values(dmsobj)

  const RoomtypeDms = []

  dmsArr.map((dms) => {
    if (dms.roomtype != "CHANNEL") {
      RoomtypeDms.push(dms)
    }

  })


  useEffect(() => {
    dispatch(getDms())
  }, [dispatch])

  const [show, setShow] = useState(false);

  return (
    <>
      {dmsobj &&
        <main className='DmsListContainer'>
          <div className='eachDms'>
            {RoomtypeDms.map((dms) => (

              <Link className='dmsLink' key={dms.id} to={`/chat/${dms.id}`} onClick={() => changeRoomHandler(dms)}>
                {dms.name}
              </Link>
            ))}

          </div>
        </main >
      }
    </>
  )

}

export default DmsBrowser
