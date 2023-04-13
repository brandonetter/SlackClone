import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, Route, useParams, useHistory } from 'react-router-dom';
import { getDms, loadDms } from '../../store/dms';
import './DmsList.css'

const DmsBrowser = () => {
    const dispatch = useDispatch()

    const dmsobj = useSelector(state => state.dms)
    const dmsArr = Object.values(dmsobj)

    useEffect(() => {
        dispatch(getDms())
    }, [dispatch])

    return (
        <>
      {dmsobj &&
        <main className='DmsListContainer'>
        <div className= 'eachDms'>
            {dmsArr.map((dms)=> (

              <Link className= 'dmsLink' key={dms.id} to={`/chat/${dms.id}`}>
                {dms.name}
              </Link>
            ))}

        </div>
        </main>
      }
     </>
    )

}

export default DmsBrowser
