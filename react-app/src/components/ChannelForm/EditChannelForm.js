// import './EditChannelForm.js'
// import { editChannel } from '../../store/channels.js'
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams, useHistory } from 'react-router-dom';



// const EditChannelForm = () => {

//     const dispatch = useDispatch();
//     const {id} = useParams()

//     console.log("ID", id)
//     const parsedId = parseInt(id)


//     const channels = useSelector(state => state.channels)
//     console.log("CHANNELS", channels)


//     if (Object.keys(channels).length){

//         console.log("channelName", channels[1])

//         // const ChannelName = channels[parseInt(id)]




//         // const ChannelType = channels[parseInt(id)]


//         // const [name, setName] = useState(ChannelName)
//         // const [type, setType] = useState(ChannelType)
//     }

//     // const ChannelType = useSelector(state => state.channels[parseInt(id)].type)


//     const updateChannelName = (e) => setName(e.target.value)
//     const updateChannelType = (e) => setType(e.target.value)

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const payload = {
//             name,
//             type
//         }

//         dispatch(editChannel(payload))
//     }

//     return (
//         <form className = "EditChannel" onSubmit={handleSubmit}>

//         <input className='EditChannelName'
//         type='text'
//         placeholder='Channel Name'
//         // value ={name}
//         onChange={updateChannelName}
//         />

//         <input className='EditChannelType'
//         type='text'
//         placeholder='Channel Type'
//         // value ={type}
//         onChange={updateChannelType}
//         />

//     <button className= 'UpdateChannelBttn' type="submit">Update Channel</button>

//     </form>

//     )
// }

// export default EditChannelForm
