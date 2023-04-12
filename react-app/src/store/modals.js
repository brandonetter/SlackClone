// constants
const SET_SEARCH = "modals/SET_SEARCH";
const SET_PROFILE = "modals/SET_PROFILE";
const SET_STATUS = "modals/SET_STATUS";


const setSearch = (state) => ({
    type: SET_SEARCH,
    payload: state,
});
const setProfile = (state) => ({
    type: SET_PROFILE,
    payload: state,
});
const setStatus = (state) => ({
    type: SET_STATUS,
    payload: state,
});




export const toggleStatus = () => async (dispatch, getState) => {
    const state = getState();
    dispatch(setStatus(!state.modals.status));
};
export const toggleSearch = () => async (dispatch, getState) => {
    const state = getState();
    dispatch(setSearch(!state.modals.search));
};
export const toggleProfile = () => async (dispatch, getState) => {
    const state = getState();
    dispatch(setProfile(!state.modals.profile));
};
export const closeAll = () => async (dispatch) => {
    dispatch(setSearch(false));
    dispatch(setProfile(false));
};




const initialState = { search: false, profile: false, status: false };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH:
            return { ...state, search: action.payload }
        case SET_PROFILE:
            return { ...state, profile: action.payload }
        case SET_STATUS:
            return { ...state, status: action.payload }

        default:
            return state;
    }
}
