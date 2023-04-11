import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleStatus } from '../../../store/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
function StatusModal() {
    const dispatch = useDispatch();
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
                        <div><div className='profile-modal-user-status status-green'></div>Active</div>
                        <div><div className='profile-modal-user-status status-red'></div>Do not disturb</div>
                        <div><div className='profile-modal-user-status status-yellow'></div>Be right back</div>
                        <div><div className='profile-modal-user-status status-dim-green'></div>Away</div>
                        <div><div className='profile-modal-user-status status-gray'></div>Offline</div>
                    </div>
                </div>
                <div className='status-modal-buttons'>
                    <div className='status-modal-cancel-button' onClick={() => dispatch(toggleStatus())}>Cancel</div>
                    <div className='status-modal-save-button'>Save</div>
                </div>

            </div>
        </div>
    </>
}

export default StatusModal;
