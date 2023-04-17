import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlusSquare, faMessage } from '@fortawesome/free-solid-svg-icons'
import './GroupDM.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeRoom } from '../../store/channel';
import { toggleGroupDM, getAllGroups } from '../../store/modals';
import defaultIcon from '../../assets/defaultIcon.png';
function GroupDM() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [myGroups, setMyGroups] = useState([]);
    const [intervalTime, setIntervalTime] = useState('');
    const user = useSelector(state => state.session.user);
    useEffect(() => {
        if (user === null) return;
        dispatch(getAllGroups()).then((res) => {
            setMyGroups(res);
        })
        setIntervalTime(setInterval(() => {
            dispatch(getAllGroups()).then((res) => {
                setMyGroups(res);
            })
        }, 2000))
        return () => {
            clearInterval(intervalTime);
        }
    }, [user])

    const trimName = (name) => {
        if (name.length > 20) {
            return name.slice(0, 20) + '...';
        }
        return name;
    }

    const toggleOpen = () => {
        setOpen(!open);
    }
    return (
        <div className='group-DM-container-outer'>
            <div className='group-DM-container'>
                <FontAwesomeIcon onClick={toggleOpen} icon={faPlay} className={open ? 'group-DM-triangle triangle-open' : 'group-DM-triangle'} />
                <span>GroupDM</span>
                <FontAwesomeIcon icon={faPlusSquare} className='group-DM-plus' onClick={() => {
                    dispatch(toggleGroupDM())
                }
                }
                />
            </div>
            {open && myGroups.length > 0 &&
                <div className='group-DM-list'>
                    {myGroups.map((group) => {
                        return (

                            <div className='group-DM-list-item' key={group.id} onClick={() => dispatch(changeRoom(group))}>
                                <FontAwesomeIcon icon={faMessage} className='group-DM-list-item-icon' />
                                <div className='group-DM-list-item-name'>{trimName(group.name)}</div>
                            </div>
                        )
                    }
                    )}
                </div>}
        </div>
    )

}
export default GroupDM;
