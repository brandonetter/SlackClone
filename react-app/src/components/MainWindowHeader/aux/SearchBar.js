import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SearchBar() {
    //get user state

    return (
        <div className='main-window-header-search-container'>
            <input type="text" placeholder="Search..." className="main-window-header-search-bar" />
            <FontAwesomeIcon icon={faSearch} className='main-window-header-search-icon' />
        </div>
    );
}
export default SearchBar;
