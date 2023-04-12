import { useSelector } from "react-redux";
import defaultIcon from "../../../assets/defaultIcon.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faFaceSmileWink } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeAll, toggleStatus } from '../../../store/modals';
function ProfileModal() {
    const dispatch = useDispatch();
    const [smile, setSmile] = useState(<FontAwesomeIcon icon={faFaceSmile} className='faceicon' />);
    const user = useSelector(state => state.session.user);
    let status = useSelector(state => state.session.status);

    // status shenanigans
    if (status == null) status = user.status;
    const statusType = status ? status.split(']')[0].slice(1) : 'Active';
    let userStatus = status ? status.split(']')[1] : user.status;
    if (userStatus === '') userStatus = statusType;
    let statusColor = '';
    if (statusType === 'Active') statusColor = ' status-green';
    if (statusType === 'Do not disturb') statusColor = ' status-red';
    if (statusType === 'Be right back') statusColor = ' status-yellow';
    if (statusType === 'Away') statusColor = ' status-dim-green';
    if (statusType === 'Offline') statusColor = ' status-gray';


    const icon = user.profileicon ? user.profileicon : defaultIcon;
    function convertToTint(name) {
        if (icon !== defaultIcon) return;
        let firstLetter = name[0].toUpperCase();
        let tint = 'A';
        if (firstLetter >= 'F' && firstLetter <= 'J') {
            tint = 'B';
        }
        if (firstLetter >= 'K' && firstLetter <= 'O') {
            tint = 'C';
        }
        if (firstLetter >= 'P' && firstLetter <= 'T') {
            tint = 'D';
        }
        if (firstLetter >= 'U' && firstLetter <= 'Z') {
            tint = 'E';
        }
        return `chat-logo-tint-${tint}`;

    }
    function openStatusModal() {
        dispatch(closeAll());
        dispatch(toggleStatus());

    }
    return (

        <div className='profile-modal-container'>
            <div className='profile-modal-name'>
                <img src={icon} alt="profile icon" className={convertToTint(user.firstname) + " main-window-header-user-icon"} />
                <div>
                    <div>{user.firstname} {user.lastname}</div>
                    <div className='profile-modal-status-display'><div className={'profile-modal-user-status' + statusColor}></div> {userStatus}</div>
                </div>


            </div>
            <div className='profile-modal-update-status-button'
                onClick={openStatusModal}
                onMouseEnter={() => setSmile(<FontAwesomeIcon icon={faFaceSmileWink} className='faceicon yellow' />)}
                onMouseLeave={() => setSmile(<FontAwesomeIcon icon={faFaceSmile} className='faceicon' />)} >
                <div className="profile-modal-smile">{smile}</div>
                Update Your Status
            </div>
        </div>
    )
}
export default ProfileModal;
