import './ChannelDetail.css'
import { useSelector, useDispatch } from 'react-redux';
import {  useEffect } from 'react';
import { getChannel } from '../../store/channels';
import { useParams } from 'react-router-dom';


const ChannelDetail = () => {

    const {channelId} = useParams();
    const dispatch = useDispatch();
    const channelsobj = useSelector(state => state.channels)
    const channelInfo = channelsobj[parseInt(channelId)]

    useEffect(() => {
        dispatch(getChannel())
    },[dispatch])

    return (
        <>
        <div className= 'channelDetails'>
         {(channelInfo) && (
            <div>
              Name: {channelInfo.name}
              <br/>
              Created By: {channelInfo.createdby}
              <br/>
             </div>
         )}
      </div>
        </>
    )
}
export default ChannelDetail
