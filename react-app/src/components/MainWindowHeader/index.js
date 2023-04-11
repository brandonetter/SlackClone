import './MainWindowHeader.css';
import ChannelDetail from '../ChannelDetail/ChannelDetail';
import EditChannelForm from '../ChannelForm/EditChannelForm';


function MainWindowHeader(){
    return <div className="main-window-header">
     <ChannelDetail />
     {/* <EditChannelForm/> */}
        </div>
}
export default MainWindowHeader;
