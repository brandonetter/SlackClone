import { toggleProfilePicture } from '../../../store/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle, faMessage } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
function ProfilePictureModal() {
    const [dragActive, setDragActive] = useState(false);
    const handleDrag = (e) => {
        console.log(e);
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragover' || e.type === 'dragenter') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }


    const dispatch = useDispatch();
    return (
        <div className="status-modal">
            <div className='status-modal-x-button' onClick={() => dispatch(toggleProfilePicture())}>
                <FontAwesomeIcon icon={faXmarkCircle} className='x-button-icon' />
            </div>
            <div className='status-modal-content'>
                <div className='status-modal-header'>
                    <h2>Upload A Picture</h2>
                </div>
                <div className='status-modal-body'>
                    <div className={'upload-modal-box ' + (dragActive ? 'drag-active' : '')} onDragEnter={handleDrag} onDragLeave={handleDrag}>

                        <form id="picture-upload" onSubmit={(e) => e.preventDefault()}>
                            <input type="file" id="input-file-upload"
                                multiple={true}
                                accept="image/jpeg, image/jpg, image/png" />

                        </form><span>Drag Image Here</span>
                    </div>
                </div>

            </div>
        </div>
    )

}
export default ProfilePictureModal;
