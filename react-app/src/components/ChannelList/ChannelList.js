import { useState, useEffect, React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, Route, useParams, useHistory } from 'react-router-dom';
import { getChannel,deleteChannel} from '../../store/channels';
import './ChannelList.css'
import { changeRoom } from '../../store/channel';
// import Modal from "../ChannelModal/ChannelModal";

const ChannelBrowser = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);
  function changeRoomHandler(room) {
    dispatch(changeRoom(room))
  }
  const channelsobj = useSelector(state => state.channels)
  const channelsArr = Object.values(channelsobj)
  // const [modalOpen, setModalOpen] = useState(false);

  const RoomtypeChannel = []



  channelsArr.map((channel) => {
    if (channel.roomtype == "CHANNEL") {
      RoomtypeChannel.push(channel)
    }
  })

  const deleteHandler = (id) => {
    dispatch(deleteChannel(parseInt(id)))
  }


  useEffect(() => {
      dispatch(getChannel())
  }, [dispatch] )

  const [show, setShow] = useState(false);

  return sessionUser.id ? (
    <div>
      {channelsobj &&
        <main className='ChannelListContainer'>
          <div className='eachChannel'>
            {RoomtypeChannel.map((channel) => (

              <Link className='channelLink' key={channel.id} to={`/chat/${channel.id}`} onClick={() => changeRoomHandler(channel)}>
                # {channel.name}

                <button className="channelLinkexpandBtn" onClick={() => setShow(!show)}>
                  {show ? '...' : '...'}
                </button>
                {show && <hr />}
                {show &&
                  <button className='deleteChannelbtn' id={channel.id} onClick={(e) => deleteHandler(e.target.id)}>Leave</button>
                  }

              </Link>


            ))}



          </div>
        </main>
      }

    </div>
  ):
  null;

}

export default ChannelBrowser
