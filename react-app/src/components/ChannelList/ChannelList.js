import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, Route, useParams, useHistory } from 'react-router-dom';
import { getChannel } from '../../store/channel';
import './ChannelList.css'
import { deleteChannel } from '../../store/channel';


const ChannelBrowser = () => {
    const dispatch = useDispatch()
    // const sessionUser = useSelector(state => state.session.user)

    const channelobj = useSelector(state => state.channel)
    const channelArr = Object.values(channelobj)

    // const deleteHandler = () => {
    //     dispatch(deleteChannel(channel.id))
    // }

    // console.log("CHANNEL", channelobj.room)

    useEffect(() => {
        dispatch(getChannel())
    }, [dispatch])

    return (
        <>
      {channelobj.room &&
        <main className='ChannelListContainer'>
        <div className= ' eachChannel'>
            {channelArr.map((channel)=> {
                return channel.name
            })}

        </div>
        </main>
      }
     </>
    )

}


export default ChannelBrowser
