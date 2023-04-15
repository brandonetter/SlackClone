import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, Route, useParams, useHistory } from 'react-router-dom';
import { getDms, loadDms } from '../../store/dms';
import './DmsList.css'

const DmsBrowser = () => {
    const dispatch = useDispatch()

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

                            <Link className='dmsLink' key={dms.id} to={`/chat/${dms.id}`}>
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
