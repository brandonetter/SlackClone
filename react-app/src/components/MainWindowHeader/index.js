import './MainWindowHeader.css';
import SearchBar from './aux/SearchBar';
import { useSelector } from 'react-redux';
import ProfileIcon from './aux/ProfileIcon';
import ChannelDetail from '../ChannelDetail/ChannelDetail';

function MainWindowHeader() {
    const user = useSelector(state => state.session.user);

    return <div className="main-window-header">
        <div />
        <SearchBar />
        <ProfileIcon user={user} />

  <div className="ChannelDetailsHide"> <ChannelDetail/></div>
    </div>
}
export default MainWindowHeader;
