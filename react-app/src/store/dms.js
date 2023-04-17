
const ADD_DMS = 'dms/addDms'
const LOAD_DMS = 'dms/loadDms'
const REMOVE_DMS = 'dms/deleteDms'

const initialState = {};

export const addDms = (dms) => ({
  type: ADD_DMS,
  dms
})


export const loadDms = (dms) => {
  return {
    type: LOAD_DMS,
    dms
  }
}

export const removeDms = (dmsId) => {
  return {
    type: REMOVE_DMS,
    dmsId
  }
}

export const getDms = () => async (dispatch) => {
  const response = await fetch('/api/room/all')

  if (response.ok) {
    const dms = await response.json()
    return dispatch(loadDms(dms))
  }
}


export const createDms = ({ name, type }) => async (dispatch) => {
  const response = await fetch('/api/room/all', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      // DM type is 1, no hardcode user
      type: 1,
    })
  })

  if (response.ok) {
    const dms = await response.json();
    dispatch(addDms(dms));
    return dms
  } else {
    const res = await response.json()
    return response.errors = res
  }
  return response
}

export const editDms = (payload) => async (dispatch) => {

  const response = await fetch(`/api/room/all/${payload.dmsId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  if (response.ok) {
    const dms = await response.json();
    dispatch(addDms(dms));
    return dms
  }

}

export const deleteDms = (id) => async (dispatch) => {
  const response = await fetch(`/api/room/all/${id}`, {
    method: "DELETE"
  })

  if (response.ok) {
    dispatch(removeDms(id))
  }
}


const dmsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_DMS:
      action.dms.forEach((dms) => {
        newState[dms.id] = dms
      })
      return newState

    case ADD_DMS:
      newState = { ...state }
      newState[action.dms.id] = action.dms
      return newState

    case REMOVE_DMS:
      newState = { ...state }
      delete newState[action.dmsId];
      return newState

    default:
      return state
  };
};

export default dmsReducer
