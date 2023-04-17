import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import './GroupDM.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleGroupDM } from '../../store/modals';
function GroupDM() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    }
    return (
        <div className='group-DM-container'>
            <FontAwesomeIcon onClick={toggleOpen} icon={faPlay} className={open ? 'group-DM-triangle triangle-open' : 'group-DM-triangle'} />
            <span>GroupDM</span>
            <FontAwesomeIcon icon={faPlusSquare} className='group-DM-plus' onClick={() => dispatch(toggleGroupDM)} />
        </div>
    )

}
export default GroupDM;
