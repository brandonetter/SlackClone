import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleStatus } from '../../../store/modals';
import { assignStatus } from '../../../store/session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle, faMessage } from '@fortawesome/free-solid-svg-icons'
function StatusModal() {
    const dispatch = useDispatch();
    const [showTextBox, setShowTextBox] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    function resetSelectedToHidden() {
        let options = document.querySelectorAll('.status-modal-options>div');
        options.forEach(option => {
            option.classList.remove('profile-modal-status-selected');
            option.classList.add('profile-modal-status-hidden');
        })
    }
    async function submit() {
        let selected = document.querySelector('.profile-modal-status-selected');
        let status = "[" + selected.innerText + "]";
        let input = document.querySelector('.status-modal-textbox');
        if (input.value) {
            status = status + input.value;
        }
        let res = await dispatch(assignStatus(status));

        if (res.status === "Status updated") {
            dispatch(toggleStatus());
        }
    }
    function resetSelected() {
        let options = document.querySelectorAll('.status-modal-options>div');
        options.forEach(option => {
            option.classList.remove('profile-modal-status-selected');
            option.classList.remove('profile-modal-status-hidden');
        })
    }
    function selectOption(e) {
        if (e.target.classList.contains('profile-modal-status-selected')) {
            resetSelected();
            setShowTextBox(false);
            setCanSubmit(false);
            return;
        }
        setShowTextBox(true);
        setCanSubmit(true);
        resetSelectedToHidden();
        e.target.classList.remove('profile-modal-status-hidden');
        e.target.classList.add('profile-modal-status-selected');
    }

    return <>
        <div className="status-modal">
            <div className='status-modal-x-button' onClick={() => dispatch(toggleStatus())}>
                <FontAwesomeIcon icon={faXmarkCircle} className='x-button-icon' />
            </div>
            <div className='status-modal-content'>
                <div className='status-modal-header'>
                    <h2>Set a status</h2>
                </div>
                <div className='status-modal-body'>
                    <div className='status-modal-options'>
                        <div onClick={selectOption}><div className='profile-modal-user-status status-green'></div>Active</div>
                        <div onClick={selectOption}><div className='profile-modal-user-status status-red'></div>Do not disturb</div>
                        <div onClick={selectOption}><div className='profile-modal-user-status status-yellow'></div>Be right back</div>
                        <div onClick={selectOption}><div className='profile-modal-user-status status-dim-green'></div>Away</div>
                        <div onClick={selectOption}><div className='profile-modal-user-status status-gray'></div>Offline</div>
                    </div>
                    {showTextBox &&
                        <div className='status-modal-textbox-holder'>
                            <FontAwesomeIcon icon={faMessage} className='status-modal-textbox-image-icon' />
                            <input type="text" className='status-modal-textbox' placeholder='Add a status message' />
                        </div>}
                </div>
                <div className='status-modal-buttons'>
                    <div className='status-modal-cancel-button' onClick={() => dispatch(toggleStatus())}>Cancel</div>
                    <div className={canSubmit ? 'status-modal-save-button-active' : 'status-modal-save-button'} onClick={submit}>Save</div>
                </div>

            </div>
        </div>
    </>
}

export default StatusModal;
