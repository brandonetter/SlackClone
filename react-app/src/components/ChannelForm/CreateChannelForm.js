import './CreateChannelForm.css'

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createChannel } from '../../store/channels';


const CreateChannelForm = () => {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [name, setName] = useState('')
    const [type, setType] = useState('')

    const createName = (e) => setName(e.target.value)
    const createType = (e) => setType(e.target.value)

    const [error, setErrors] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            type: 3,

        };

        const data = await dispatch(createChannel(payload))
        if (data) setErrors(data.errors)

        console.log("CHANNELS DATA", data)
    }
    const [show, setShow] = useState(false);

    return sessionUser.id ? (
        <>
            <div>
                <button className="ExpandChannelsBtn" onClick={() => setShow(!show)}>
                    {show ? 'Channels' : 'Channels'}
                </button>
                {show && <hr />}
                {show &&

                    <form className="createChannel" onSubmit={handleSubmit}>

                        <div className='CreateChannelError'>
                            {error && error.map((error, i) => {
                                return <div key={i}>{error}</div>
                            })}
                        </div>

                        <input className='createChannelName'
                            type='text'
                            placeholder='Channel Name'
                            value={name}
                            onChange={createName}
                        />

                        <button className='CreateChannelBttn' type="submit">Create New Channel</button>

                    </form>
                }
            </div>
        </>
    ) :
        null;
}

export default CreateChannelForm
