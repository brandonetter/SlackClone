import { toggleSearch, sendSearch, createDMs } from '../../../store/modals';
import { getDms } from '../../../store/dms';
import { getChannel } from '../../../store/channels';
import { changeRoom } from '../../../store/channel';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import defaultIcon from "../../../assets/defaultIcon.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkSquare, faSearch, faMessage } from '@fortawesome/free-solid-svg-icons'
function SearchModal() {
    const dispatch = useDispatch();
    const [preText, setPreText] = useState('I\'m looking for ...');
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [resultType, setResultType] = useState('users');
    const setNewSearchValue = (e) => {
        let newSearchValue = e.target.value;

        setSearchValue(newSearchValue);
    }
    const createDM = async (user) => {
        let room = await dispatch(createDMs(user));
        if (room.id) {
            dispatch(changeRoom(room));
            dispatch(toggleSearch());
        }
        dispatch(getChannel());
    }
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
    const getMove = () => {
        if (preText == 'people:') {

            return ' move-right-10';

        }
        if (preText == 'messages:') {

            return ' move-right-35';

        }
        return '';
    }
    useEffect(() => {
        setSearchValue('');
        setSearchResults([]);
    }, [preText]);

    useEffect(() => {
        if (searchValue == '') {
            return;
        }
        let searchType = 'all';
        if (preText == 'people:') searchType = 'people';
        if (preText == 'messages:') searchType = 'messages';
        async function getSearchResults() {
            const data = await dispatch(sendSearch(searchType, searchValue));
            if (data?.users) {
                setResultType('users');
                setSearchResults(data.users);
            }
            if (data?.messages) {
                setResultType('messages');
                setSearchResults(data.messages);
            }
        }
        getSearchResults();
    }, [searchValue])
    return (
        <div className="search-modal">
            <div className="search-modal-header">
                <div className="search-modal-search-bar">
                    {preText !== 'I\'m looking for ...' && <span className='search-modal-pretext'>{preText}</span>}
                    {preText == 'I\'m looking for ...' &&
                        <FontAwesomeIcon icon={faSearch} className='search-modal-search-icon' />
                    }
                    <input type="text" placeholder={'Search...'} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className={"search-modal-search-bar-input" + getMove()} />
                </div>
                <div className="search-modal-x-button" onClick={() => dispatch(toggleSearch())}>
                    <FontAwesomeIcon icon={faXmarkSquare} />
                </div>
            </div>
            <div className="search-modal-helper">
                <span>I'm looking for ...</span>
                <div className="search-modal-helper-buttons">
                    <div className={"search-modal-helper-button " + (preText == 'people:' && 'button-active')}
                        onClick={() => setPreText('people:')}>
                        <span>People</span>
                    </div>
                    <div className={"search-modal-helper-button " + (preText == 'messages:' && 'button-active')}
                        onClick={() => setPreText('messages:')}>
                        <span>Messages</span>
                    </div>
                </div>



            </div>
            {searchResults.length > 0 && searchValue !== '' && resultType == 'users' &&
                <div className="search-modal-results">
                    {searchResults.map((result, idx) => {
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
                                        <FontAwesomeIcon icon={faMessage} onClick={() => createDM(result.id)} />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}

                </div>
            }
            {searchResults.length > 0 && searchValue !== '' && resultType == 'messages' &&
                <div className="search-modal-results">
                    {searchResults.map((result, idx) => {
                        return (
                            <div key={idx}>
                                <div className="search-modal-result result-small">

                                    <div className="search-modal-result-info result-small">
                                        {generateIcon(result)}
                                        <div className="search-modal-result-info-text">
                                            <span>{result.firstname} {result.lastname}</span> :

                                        </div>
                                    </div>

                                </div>
                                <span className='search-modal-message'>{result.message}</span>
                            </div>
                        )
                    }
                    )}

                </div>
            }


        </div>
    )

}
export default SearchModal;
