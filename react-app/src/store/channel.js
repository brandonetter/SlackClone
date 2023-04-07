// constants


const SET_ROOM = "channel/SET_ROOM";
const ADD_CHANNEL = 'channels/addChannel'
const LOAD_CHANNELS = 'channels/loadChannels'
const REMOVE_CHANNEL = '/channels/deleteChannel'


const setRoom = (room) => ({
  type: SET_ROOM,
  payload: room,
});

const initialState = { room: null };

export const joinDefaultRoom = () => async (dispatch) => {
  const response = await fetch("/api/room/init", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();

    // console.log(data)
    if (data.errors) {
      return;
    }

    dispatch(setRoom(data));
  }
};


export const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  channel
})

export const loadChannel = (channel) => {
  return {
    type: LOAD_CHANNELS,
    channel
  }
}

export const removeChannel = (channelId) => {
  return {
    type: REMOVE_CHANNEL,
    channelId
  }

}

export const getChannel = () => async (dispatch) => {
  const response = await fetch('/api/room/all')


  if(response.ok) {
    const channels = await response.json()
    // console.log(channels)
    return dispatch(loadChannel(channels.name))
  }
}

export const createChannel = (payload) => async (dispatch) => {
  const response = await fetch('/api/songs',{
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })

  if(response.ok) {
    const channel = await response.json();
    dispatch(addChannel(channel));
    return channel
  }
  return response
}

export const editChannel = (payload) => async (dispatch) => {
  const response = await fetch(`/api/songs/${payload.channelId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    const channel = await response.json();
    dispatch(addChannel(channel));
    return channel
  }
}

export const deleteChannel = (channelId) => async (dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`, {
    method: "DELETE"
  })

  if(response.ok) {
    dispatch(removeChannel(channelId))
  }
}



const channelsReducer = (state= initialState, action) => {
  let newState = {...state};
  switch(action.type) {
    case SET_ROOM:
      return { room: action.payload };

    case LOAD_CHANNELS:
      action.channels.forEach((channel)=>{
        newState[channel.id] = channel
      })

    case ADD_CHANNEL:
      newState = {...state}
      newState[action.channel.id] = action.channel
      return newState

    case REMOVE_CHANNEL:
      newState = {...state}
      delete newState[action.channelId];
      return newState

    default:
      return state
  };
};

export default channelsReducer
