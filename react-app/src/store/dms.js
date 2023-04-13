
const ADD_DMS = 'dms/addDms'
const LOAD_DMS = 'dms/loadDms'

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

 export const getDms = () => async (dispatch) => {
    const response = await fetch('/api/room/all')

    if(response.ok) {
      const dms = await response.json()
      return dispatch(loadDms(dms))
    }
  }


  export const createDms = ({name, type}) => async (dispatch) => {
    const response = await fetch('/api/room/all',{
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
          name,
          type,
          createdby: "demo@aa.io"
        })
    })

    if(response.ok) {
      const dms = await response.json();
      dispatch(addDms(dms));
      return dms
    }
    return response
  }

  const dmsReducer = (state= initialState, action) => {
    let newState = {...state};
    switch(action.type) {
      case LOAD_DMS:
        action.dms.forEach((dms)=>{
          newState[dms.id] = dms
        })
        return newState

      case ADD_DMS:
        newState = {...state}
        newState[action.dms.id] = action.dms
        return newState

      default:
        return state
    };
  };

  export default dmsReducer
