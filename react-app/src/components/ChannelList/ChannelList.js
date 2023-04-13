import { useState, useEffect, React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, Route, useParams, useHistory } from 'react-router-dom';
import { getChannel, loadChannel } from '../../store/channels';
import './ChannelList.css'
import { deleteChannel } from '../../store/channels';


const ChannelBrowser = () => {
  const dispatch = useDispatch()
  // const sessionUser = useSelector(state => state.session.user)

  const channelsobj = useSelector(state => state.channels)
  const channelsArr = Object.values(channelsobj)

     const RoomtypeChannel = []


    channelsArr.map((channel) => {
      if(channel.roomtype == "CHANNEL"){

        //display channel
       RoomtypeChannel.push(channel)

      }else {

        //error message: must be channel to be displayed
      }
    })


  //  function ChannelFilter(arr, query){
  //   return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
  //  }

  // console.log("channel", RoomtypeChannel)


  const deleteHandler = (id) => {
    dispatch(deleteChannel(parseInt(id)))
  }


    // useEffect(() => {
    //     dispatch(getChannel())
    // }, [dispatch])

    const [show, setShow] = useState(false);

    return (
        <div>
      {channelsobj &&
        <main className='ChannelListContainer'>
        <div className= 'eachChannel'>
            {RoomtypeChannel.map((channel)=> (

              <Link className= 'channelLink' key={channel.id} to={`/chat/${channel.id}`}>
                # {channel.name}

                <button className="channelLinkexpandBtn" onClick={() => setShow(!show)}>
                  {show ? '...' : '...'}
                </button>
                  {show && <hr />}
                  {show &&
                   <button className='deleteChannelbtn' id={channel.id} onClick={(e)=> deleteHandler(e.target.id)}>Leave</button>}

                {/* <button className='deleteChannelbtn' id={channel.id} onClick={(e)=> deleteHandler(e.target.id)}>delete</button> */}

              </Link>


            ))}

          </div>
        </main>
      }

     </div>
    )

}

export default ChannelBrowser
