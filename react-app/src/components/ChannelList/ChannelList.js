import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, Route, useParams, useHistory } from 'react-router-dom';
import { getChannel } from '../../store/channel';
import './ChannelList.css'


const ChannelBrowser = () => {
    const dispatch = useDispatch()
    // const sessionUser = useSelector(state => state.session.user)

    const channelobj = useSelector(state => state.channel)
    const channelArr = Object.values(channelobj)

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
