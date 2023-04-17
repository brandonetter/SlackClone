import './EditChannelForm.css'
import { editChannel } from '../../store/channels.js'
import {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';



const EditChannelForm = () => {

    const dispatch = useDispatch();
    const {channelId} = useParams()
    const sessionUser = useSelector((state) => state.session.user);

    const parsedId = parseInt(channelId)

    const channels = useSelector(state => state.channels)
    let ChannelName;
    let ChannelType;


    if (Object.keys(channels).length){

       ChannelName = channels[parsedId]
       ChannelType = channels[parsedId]
    }

    const [name, setName] = useState(ChannelName.name)
    const [type, setType] = useState(ChannelType.type)
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

    return sessionUser.id ?(
        <form className = "EditChannel" onSubmit={handleSubmit}>

        <input className='EditChannelName'
        type='text'
        value ={name}
        onChange={updateChannelName}
        />


    <button className= 'UpdateChannelBttn' type="submit">Update</button>

    </form>

    ):
    null;
}

export default EditChannelForm
