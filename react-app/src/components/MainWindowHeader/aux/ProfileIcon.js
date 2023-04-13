
import defaultIcon from '../../../assets/defaultIcon.png';
import { useState, useEffect } from 'react';
function ProfileIcon({ user }) {
    const icon = user.profileicon ? user.profileicon : defaultIcon;
    const [openModal, setOpenModal] = useState(false);
    function convertToTint(name) {
        if (icon === defaultIcon) return;
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
        <div className='main-window-header-user' onClick={() => setOpenModal(!openModal)}>
            <img src={icon} alt="profile icon" className={convertToTint(user.firstname)} />
            <div className='main-window-header-user-status'>
            </div>
            {openModal && <div className='main-window-header-user-modal'>
                adasd
            </div>}
        </div></>
}
export default ProfileIcon;
