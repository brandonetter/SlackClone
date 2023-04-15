// constants
const SET_ROOM = "channel/SET_ROOM";
const SET_USERS = "channel/SET_USERS";

const setRoom = (room) => ({
  type: SET_ROOM,
  payload: room,
});
const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});




const initialState = { room: null, users: null };
export const changeRoom = (room) => async (dispatch) => {
  dispatch(setRoom(room))
}

export const joinDefaultRoom = () => async (dispatch) => {
  const response = await fetch("/api/room/init", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setRoom(data));
  }
};

export const updateMessage = (messageId, message) => async (dispatch) => {
  const response = await fetch(`/api/messages/${messageId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message }),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
    return data;
  }
};

export const deleteMessage = (messageId) => async (dispatch) => {
  const response = await fetch(`/api/messages/${messageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
    return data;

  }
};


export const getUsersInRoom = (roomId) => async (dispatch) => {
  const response = await fetch(`/api/room/${roomId}/users`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(setUsers(data));
  }
};


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROOM:
      return { ...state, room: action.payload };
    case SET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}
