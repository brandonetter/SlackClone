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

    const [error, setErrors] =useState([])


    const handleSubmit = async (e) => {
        e.preventDefault();

    const payload = {
        name,
        type,

    };



    const data = await dispatch(createChannel(payload))

    if(data) setErrors(data.errors)

}
const [show, setShow] = useState(false);

return (
<>
    <div>
    <button className="ExpandChannelsBtn" onClick={() => setShow(!show)}>
    {show ? 'Channels' : 'Channels'}
    </button>
    {show && <hr />}
    {show &&

    <form className = "createChannel" onSubmit={handleSubmit}>

     <div>
        {error && error.map((error,i)=>{
            return <div key={i}>{error}</div>
        })}
     </div>

        <input className='createChannelName'
        type='text'
        placeholder='Channel Name'
        value ={name}
        onChange={createName}
        />

        {/* <input className='createChannelType'
        type='text'
        placeholder='Channel Type'
        value ={3}
        onChange={createType}
        /> */}
    <button className= 'CreateChannelBttn' type="submit">Create New Channel</button>

    </form>


    }

    </div>
    </>
)

}

export default CreateChannelForm
