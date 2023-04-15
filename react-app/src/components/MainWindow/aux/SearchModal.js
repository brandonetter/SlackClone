import { toggleSearch, sendSearch } from '../../../store/modals';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import defaultIcon from "../../../assets/defaultIcon.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkSquare, faSearch } from '@fortawesome/free-solid-svg-icons'
function SearchModal() {
    const dispatch = useDispatch();
    const [preText, setPreText] = useState('I\'m looking for ...');
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const setNewSearchValue = (e) => {
        let newSearchValue = e.target.value;

        setSearchValue(newSearchValue);
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
        const icon = user.profileicon ? user.profileicon : defaultIcon;
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
        if (preText == 'people:') return ' move-right-10';
        if (preText == 'messages:') return ' move-right-35';
        return '';
    }

    useEffect(() => {
        if (searchValue == '') {
            return;
        }
        let searchType = 'all';
        if (preText == 'people:') searchType = 'people';
        if (preText == 'messages:') searchType = 'messages';
        async function getSearchResults() {
            const data = await dispatch(sendSearch(searchType, searchValue));
            if (data) {
                console.log(data);
                setSearchResults(data.users);
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
            {searchResults.length > 0 && searchValue !== '' &&
                <div className="search-modal-results">
                    {searchResults.map((result) => {
                        return (
                            <div className="search-modal-result">
                                <div className="search-modal-result-image">
                                    <img src={result.profile_image} />
                                </div>
                                <div className="search-modal-result-info">
                                    {generateIcon(result)}
                                    <div className="search-modal-result-info-text">
                                        <span>{result.username}</span>
                                        <span>{result.firstname} {result.lastname}</span>
                                    </div>
                                </div>
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
