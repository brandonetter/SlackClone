import { useDispatch } from "react-redux";
import { joinDefaultRoom } from "../../store/channel";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./RoomSidebar.css";
import ChannelBrowser from "../ChannelList/ChannelList";
import CreateChannelForm from "../ChannelForm/CreateChannelForm";
import { getChannel } from "../../store/channels";
import DmsBrowser from "../DmsList/DmsList";
import CreateDmsForm from "../DmsForm/CreateDmsForm";
import GroupDM from "../GroupDM";
// import Modal from "../ChannelModal/ChannelModal";
// import ChannelList "../ChannelList"

function RoomSidebar() {
  const dispatch = useDispatch();
  const currentChannel = useSelector((state) => state.channel.room);
  useEffect(() => {
    dispatch(getChannel());
    if (!currentChannel) dispatch(joinDefaultRoom());
  }, []);
  // const [modalOpen, setModalOpen] = useState(false);
  const channels = useSelector((state) => state.channels)

  const dms = useSelector((state) => state.dms)
  return (
    <div className="room-sidebar">
      <div className="room-sidebar-header">
        <h2>Current Channel:</h2>



        {/* {currentChannel && <h3>{currentChannel.name}</h3>} */}

        {(channels) &&
          <div>
            <CreateChannelForm />
          </div>
        }
        <ChannelBrowser />

        <h2>Direct Messages:</h2>


        {(dms) &&
          <div>
            <CreateDmsForm />
          </div>
        }
        {/* <div>
          <CreateDmsForm />
        </div> */}

        <DmsBrowser />
        <GroupDM />


      </div>
    </div>
  );
}
export default RoomSidebar;
