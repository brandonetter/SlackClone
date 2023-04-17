
import defaultIcon from '../../../assets/defaultIcon.png';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleProfile } from '../../../store/modals';
import { getUserProfileImage } from '../../../store/session';
function ProfileIcon({ user }) {
    let status = useSelector(state => state.session.status);
    let realUser = useSelector(state => state.session.user);
    let profileIconImage = useSelector(state => state.session.profilePicture);

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

    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [icon, setIcon] = useState(defaultIcon);

    function convertToTint(name) {
        if (realUser.profileicon) return;
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
    return <>
        <div className='main-window-header-user' onClick={() => dispatch(toggleProfile())}>
            <img src={profileIconImage} alt="profile icon" className={convertToTint(user.firstname)} />
            <div className={'main-window-header-user-status' + statusColor}>
            </div>
            {openModal && <div className='main-window-header-user-modal'>
                adasd
            </div>}
        </div></>
}
export default ProfileIcon;
