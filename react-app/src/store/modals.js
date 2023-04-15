// constants
const SET_SEARCH = "modals/SET_SEARCH";
const SET_PROFILE = "modals/SET_PROFILE";
const SET_STATUS = "modals/SET_STATUS";
const SET_PROFILE_PICTURE = "modals/SET_PROFILE_PICTURE";

// actions
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
const setProfilePicture = (state) => ({
    type: SET_PROFILE_PICTURE,
    payload: state,
});



// thunks
export const toggleStatus = () => async (dispatch, getState) => {
    const state = getState();
    dispatch(setStatus(!state.modals.status));
};
export const toggleProfilePicture = () => async (dispatch, getState) => {
    const state = getState();
    dispatch(setProfilePicture(!state.modals.profilepicture));
};
export const toggleSearch = (bool = undefined) => async (dispatch, getState) => {
    const state = getState();
    if (bool === undefined) {
        dispatch(setSearch(!state.modals.search));
    } else {
        dispatch(setSearch(bool));
    }

};
export const toggleProfile = () => async (dispatch, getState) => {
    const state = getState();
    dispatch(setProfile(!state.modals.profile));
};
export const closeAll = () => async (dispatch) => {
    dispatch(setSearch(false));
    dispatch(setProfile(false));
};

export const handleFileUpload = (file) => async (dispatch) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/user/profileimage/upload/", {
        method: "POST",
        body: formData,
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            console.log(data.errors);
            return;
        }
        return data;
    }
};

export const sendSearch = (type, search) => async (dispatch) => {
    const response = await fetch("/api/search/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type,
            search,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            console.log(data.errors);
            return;
        }
        return data;
    }
};




const initialState = { search: false, profile: false, status: false, profilepicture: false };

// reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH:
            return { ...state, search: action.payload }
        case SET_PROFILE:
            return { ...state, profile: action.payload }
        case SET_STATUS:
            return { ...state, status: action.payload }
        case SET_PROFILE_PICTURE:
            return { ...state, profilepicture: action.payload }

        default:
            return state;
    }
}
