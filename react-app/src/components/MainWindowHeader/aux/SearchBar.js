import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { toggleSearch } from '../../../store/modals';
import { useDispatch } from 'react-redux';
function SearchBar() {
    //get user state
    const dispatch = useDispatch();
    const search = useSelector(state => state.modals.search);
    const searchBar = useRef();
    useEffect(() => {
        searchBar.current.onfocus = () => {
            dispatch(toggleSearch(true));
        }
        searchBar.current.onblur = () => {
            // dispatch(toggleSearch());
            // searchBar.current.placeholder = 'Search...';
        }
    }, [searchBar]);

    return (
        <div className='main-window-header-search-container' >
            <input type="text" placeholder="Search..." className="main-window-header-search-bar" ref={searchBar} />
            <FontAwesomeIcon icon={faSearch} className='main-window-header-search-icon' />
        </div>
    );
}
export default SearchBar;
