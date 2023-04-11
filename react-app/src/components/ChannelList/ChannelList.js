import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, Route, useParams, useHistory } from 'react-router-dom';
import { getChannel, loadChannel } from '../../store/channels';
import './ChannelList.css'
import { deleteChannel } from '../../store/channel';


const ChannelBrowser = () => {
    const dispatch = useDispatch()
    // const sessionUser = useSelector(state => state.session.user)

    const channelsobj = useSelector(state => state.channels)
    const channelsArr = Object.values(channelsobj)

    // const deleteHandler = () => {
    //     dispatch(deleteChannel(channel.id))
    // }

    console.log("CHANNEL", channelsobj)

    useEffect(() => {
        dispatch(getChannel())
    }, [dispatch])

    return (
        <>
            {channelsobj &&
                <main className='ChannelListContainer'>
                    <div className=' eachChannel'>
                        {channelsArr.map((channel) => {
                            return channel.name
                        })}

                    </div>
                </main>
            }
        </>
    )

}


export default ChannelBrowser
