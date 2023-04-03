// constants
const SET_ROOM = "channel/SET_ROOM";

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
    if (data.errors) {
      return;
    }

    dispatch(setRoom(data));
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROOM:
      return { room: action.payload };
    default:
      return state;
  }
}
