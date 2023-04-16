import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, Route, useParams, useHistory } from 'react-router-dom';
import { getDms, deleteDms } from '../../store/dms';
import './DmsList.css'

const DmsBrowser = () => {
    const dispatch = useDispatch()

    const dmsobj = useSelector(state => state.dms)
    const dmsArr = Object.values(dmsobj)

    const RoomtypeDms = []

    dmsArr.map((dms)=> {
      if(dms.roomtype != "CHANNEL"){
        RoomtypeDms.push(dms)
      }

    })

    const deleteHandler = (id) => {
      dispatch(deleteDms(parseInt(id)))
    }

    useEffect(() => {
        dispatch(getDms())
    }, [dispatch])

    const [show, setShow] = useState(false);

    return (
        <>
      {dmsobj &&
        <main className='DmsListContainer'>
        <div className= 'eachDms'>
            {RoomtypeDms.map((dms)=> (

              <Link className= 'dmsLink' key={dms.id} to={`/chat/${dms.id}`}>
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
        </main>
      }
     </>
    )

}

export default DmsBrowser
