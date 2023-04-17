import { getUserProfileImage, authenticate } from "./session";
// constants
const SET_SEARCH = "modals/SET_SEARCH";
const SET_PROFILE = "modals/SET_PROFILE";
const SET_STATUS = "modals/SET_STATUS";
const SET_PROFILE_PICTURE = "modals/SET_PROFILE_PICTURE";
const SET_GROUP_DM = "modals/SET_GROUP_DM";
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
const setGroupDM = (state) => ({
    type: SET_GROUP_DM,
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
export const toggleGroupDM = () => async (dispatch, getState) => {
    const state = getState();
    dispatch(setGroupDM(!state.modals.groupdm));
};
export const getAllGroups = () => async (dispatch) => {
    const response = await fetch("/api/room/group/all", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        return data;
    }
};


export const createGroupDM = (users) => async (dispatch) => {
    const response = await fetch("/api/room/group/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            users,
        }),
    });
    if (response.ok) {
        const data = await response.json();

        return data;
    }
};

export const handleFileUpload = (file, id) => async (dispatch) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/users/profileimage/upload/", {
        method: "POST",
        body: formData,
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        } setTimeout(() => {
            dispatch(authenticate());
            dispatch(getUserProfileImage(id));
        }, 1000);
        return data;

    }
};
export const createDMs = (user) => async (dispatch) => {
    const response = await fetch("/api/room/dm/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }
        return data;
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
            return;
        }
        return data;
    }
};




const initialState = { search: false, profile: false, status: false, profilepicture: false, groupdm: false };

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
        case SET_GROUP_DM:
            return { ...state, groupdm: action.payload }
        default:
            return state;
    }
}
