import './CreateChannelForm.css'

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChannel } from '../../store/channels';


const CreateChannelForm = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [type, setType] = useState('')

    const createName = (e) => setName(e.target.value)
    const createType = (e) => setType(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();

    const payload = {
        name,
        type,

    };

    dispatch(createChannel(payload))

}

return (
    <form className = "createChannel" onSubmit={handleSubmit}>

        <input className='createChannelName'
        type='text'
        placeholder='Channel Name'
        value ={name}
        onChange={createName}
        />

        <input className='createChannelType'
        type='text'
        placeholder='Channel Type'
        value ={type}
        onChange={createType}
        />

    <button className= 'CreateChannelBttn' type="submit">Add Channel</button>

    </form>
)

}

export default CreateChannelForm
