import './EditChannelForm.js'
import { editChannel } from '../../store/channels.js'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory } from 'react-router-dom';



const EditChannelForm = () => {

    const dispatch = useDispatch();
    const {channelId} = useParams()

    // console.log("ID", channelId)
    const parsedId = parseInt(channelId)
    const history = useHistory()

    const channels = useSelector(state => state.channels)
    let ChannelName;
    let ChannelType;


    if (Object.keys(channels).length){

       ChannelName = channels[parsedId]
       ChannelType = channels[parsedId]

    }


    const [name, setName] = useState(ChannelName.name)
    const [type, setType] = useState(ChannelType.type)
    // const ChannelType = useSelector(state => state.channels[parseInt(id)].type)


    const updateChannelName = (e) => setName(e.target.value)
    const updateChannelType = (e) => setType(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            channelId,
            name,
            type
        }

        dispatch(editChannel(payload))

    }

    const editRedirect = (e) =>{
        e.preventDefault();
        history.push('/chat/${channelId}')
    }
    return (
        <form className = "EditChannel" onSubmit={handleSubmit}>

        <input className='EditChannelName'
        type='text'
        // placeholder='Channel Name'
        value ={name}
        onChange={updateChannelName}
        />

        <input className='EditChannelType'
        type='text'
        // placeholder='Channel Type'
        value ={type}
        onChange={updateChannelType}
        />

    <button className= 'UpdateChannelBttn' type="submit" onClick={editRedirect}>Update Channel</button>

    </form>

    )
}

export default EditChannelForm
