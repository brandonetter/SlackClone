import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleGroupDM, sendSearch, createGroupDM, getAllGroups } from '../../../store/modals';
import { faXmarkCircle, faMessage, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { changeRoom } from '../../../store/channel';
import defaultIcon from '../../../assets/defaultIcon.png';
function GroupDM() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [errors, setErrors] = useState([]);


    const getStatusColor = (user) => {
        let status = user.status;
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
        return statusColor;
    }
    const generateIcon = (user) => {
        const icon = defaultIcon;
        const statusColor = getStatusColor(user);
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
        return (
            <div className='search-modal-results-icon'>
                <img src={icon} alt="profile icon" className={convertToTint(user.firstname) + " main-window-header-user-icon"} />
                <div className={"main-window-header-user-status" + statusColor}></div>
            </div>
        )
    }
    useEffect(() => {
        if (searchValue == '') {
            return;
        }
        let searchType = 'people';
        async function getSearchResults() {
            const data = await dispatch(sendSearch(searchType, searchValue));
            if (data?.users) {
                setSearchResults(data.users);
            }

        }
        getSearchResults();
    }, [searchValue])
    useEffect(() => {
        // if user is already selected, remove from search results
        let newSearchResults = searchResults.filter((result) => {
            let alreadySelected = false;
            selectedUsers.forEach((user) => {
                if (user.id === result.id) {
                    alreadySelected = true;
                }
            })
            return !alreadySelected;
        })
        // if the user is us, remove from search results
        newSearchResults = newSearchResults.filter((result) => result.id !== currentUser.id);

        setFilteredResults(newSearchResults);
    }, [searchResults])

    const addSelectedUser = (user) => {
        // remove user from search results
        let newSearchResults = searchResults.filter((result) => result.id !== user.id);
        setSearchResults(newSearchResults);
        // add user to selected users
        let newSelectedUsers = [...selectedUsers, user];
        setSelectedUsers(newSelectedUsers);
    }
    const removeSelectedUser = (user) => {
        // remove user from selected users
        let newSelectedUsers = selectedUsers.filter((result) => result.id !== user.id);
        setSelectedUsers(newSelectedUsers);

    }
    const submitCreateDM = async () => {
        setErrors([]);
        let res = await dispatch(createGroupDM(selectedUsers))
        if (res.error) {
            setErrors(res.error);
        } else {
            dispatch(changeRoom(res))
            dispatch(toggleGroupDM());
        }

    }
    return (
        <div className='group-DM-modal'>
            <div className='group-DM-modal-x-button'>
                <FontAwesomeIcon icon={faXmarkCircle} style={{ width: '20px', height: '20px' }} onClick={() => dispatch(toggleGroupDM())} />
            </div>
            <div className='group-DM-modal-header'>
                <h1>Select Users:</h1>
            </div>
            <div className='group-DM-modal-search-bar'>
                <input type='text' placeholder='Search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className='search-modal-search-bar-input border-bottom' />
            </div>
            {filteredResults.length > 0 && searchValue !== '' &&
                <div className="search-modal-results group-dm-results">
                    {filteredResults.map((result, idx) => {
                        return (
                            <div key={idx} className="search-modal-result">

                                <div className="search-modal-result-info ">
                                    {generateIcon(result)}
                                    <div className="search-modal-result-info-text">

                                        <span>{result.firstname} {result.lastname} </span>
                                        <span className='search-dim'>{result.username} </span>
                                    </div>
                                </div>

                                <div className="search-modal-result-buttons">
                                    <div className="search-modal-result-button">
                                        <FontAwesomeIcon icon={faPlusSquare} style={{ width: '30px', height: '30px' }}
                                            onClick={() => { addSelectedUser(result); setSearchValue('') }} />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}

                </div>
            }
            {selectedUsers.length > 0 && <>
                <h2 className='selected-users-text'>Selected Users:</h2><br />
                <div className="dm-selected-users group-dm-results">

                    {selectedUsers.map((result, idx) => {
                        return (
                            <div key={idx} className="search-modal-result">

                                <div className="search-modal-result-info ">
                                    {generateIcon(result)}
                                    <div className="search-modal-result-info-text">

                                        <span>{result.firstname} {result.lastname} </span>
                                        <span className='search-dim'>{result.username} </span>
                                    </div>
                                </div>
                                <div className="search-modal-result-buttons">
                                    <div className="search-modal-result-button">
                                        <FontAwesomeIcon icon={faMinusSquare} style={{ width: '30px', height: '30px' }}
                                            onClick={() => removeSelectedUser(result)} />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}

                </div></>
            }
            <div className='group-DM-modal-buttons'>
                {errors}
                <button className='group-DM-modal-cancel-button' onClick={() => dispatch(toggleGroupDM())}>Cancel</button>
                <button
                    className={selectedUsers.length > 1 ? 'group-DM-modal-create-button-active' : 'group-DM-modal-create-button'} onClick={submitCreateDM}>Create</button>

            </div>
        </div>
    )
}
export default GroupDM;
