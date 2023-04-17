// constants
const ADD_CHANNEL = 'channels/addChannel'
const LOAD_CHANNELS = 'channels/loadChannels'
const REMOVE_CHANNEL = '/channels/deleteChannel'


const initialState = {};


export const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  channel
})

export const loadChannel = (channels) => {
  return {
    type: LOAD_CHANNELS,
    channels
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
  //   console.log(response)

  if (response.ok) {
    const channels = await response.json()
    // console.log("getChannel", channels)
    return dispatch(loadChannel(channels))
  }
}

export const createChannel = ({ name, type }) => async (dispatch) => {
  const response = await fetch('/api/room/all', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      type,
      createdby: "demo@aa.io"
    })
  })

  if (response.ok) {
    const channel = await response.json();
    // console.log(channel)
    dispatch(addChannel(channel));
    return channel
  } else {
    const res = await response.json()
    return response.errors = res
  }
  return response
}

export const editChannel = (payload) => async (dispatch) => {


  const response = await fetch(`/api/room/all/${payload.channelId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    const channel = await response.json();
    dispatch(addChannel(channel));
    return channel
  }
}

export const deleteChannel = (id) => async (dispatch) => {
  const response = await fetch(`/api/room/all/${id}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(removeChannel(id))
  }
}

const channelsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_CHANNELS:
      //   console.log("ACTION.CHANNELS" , action.channels)
      action.channels.forEach((channel) => {
        newState[channel.id] = channel
      })
      return newState

    case ADD_CHANNEL:
      // console.log("ACTION.CHANNEL" , action.channel)
      newState = { ...state }
      newState[action.channel.id] = action.channel
      return newState

    case REMOVE_CHANNEL:
      newState = { ...state }
      delete newState[action.channelId];
      return newState

    default:
      return state
  };
};

export default channelsReducer
