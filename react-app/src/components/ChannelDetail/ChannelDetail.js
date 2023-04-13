import './ChannelDetail.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getChannel } from '../../store/channels';
import { useParams, useHistory } from 'react-router-dom';

const ChannelDetail = () => {


    const {channelId} = useParams();

    const dispatch = useDispatch();

    const channelsobj = useSelector(state => state.channels)
    const channelInfo = channelsobj[parseInt(channelId)]

    // console.log("CHANNEL ID", parseInt(channelId))
    // console.log("CHANNEL", channelInfo)

    useEffect(() => {
        dispatch(getChannel())
    },[dispatch])

    const history = useHistory()
    const redirectToEdit = () => {
        history.push(`/chat/${channelId}/edit`)
    }

    return (
        <>
        <div className= 'channelDetails'>

         {(channelInfo) && (

            <div>
              ChannelName: {channelInfo.name}
              <br/>
              CreatedBy: {channelInfo.createdby}
              <br/>
              RoomType: {channelInfo.roomtype}
              <br/>
             </div>
         )}

         <button className = "editChannelbtn" type="submit" onClick={redirectToEdit}> Edit Channel</button>
      </div>
        </>
    )

}



export default ChannelDetail
