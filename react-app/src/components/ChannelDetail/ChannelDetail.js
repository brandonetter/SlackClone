import './ChannelDetail.css'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getChannel } from '../../store/channels';
import { useParams } from 'react-router-dom';


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


      </div>
        </>
    )

}



export default ChannelDetail
