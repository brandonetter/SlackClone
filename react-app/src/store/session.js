// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_USER_STATUS = "session/SET_USER_STATUS";
const SET_USER_PROFILE_PICTURE = "session/SET_USER_PROFILE_PICTURE";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const setUserStatus = (status) => ({
	type: SET_USER_STATUS,
	payload: status,
});
const setUserProfilePicture = (profilePicture) => ({
	type: SET_USER_PROFILE_PICTURE,
	payload: profilePicture,
});



const initialState = { user: null, status: null, profilePicture: null };


export const assignStatus = (status) => async (dispatch) => {
	const response = await fetch("/api/users/status", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			status,
		}),

	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		if (data.status === "Status updated") {
			dispatch(setUserStatus(status));
		}
		return data;
	}
};

export const getUserProfileImage = (id) => async (dispatch) => {
	const response = await fetch("/api/users/profileimage/" + id, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		let data = await response.blob();

		if (data.errors) {
			return;
		}
		//data = URL.createObjectURL(data);
		// convert to base64 image url
		const reader = new FileReader();
		reader.readAsDataURL(data);
		reader.onloadend = function () {
			const base64data = reader.result;
			dispatch(setUserProfilePicture(base64data));
		};
		// dispatch(setUserProfilePicture(data));
		return data;
	}
};

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		dispatch(getUserProfileImage(data.id));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password, firstName, lastName) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			firstName: firstName,
			lastName,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case SET_USER_STATUS:
			return { ...state, status: action.payload };
		case SET_USER_PROFILE_PICTURE:
			return { ...state, profilePicture: action.payload };

		default:
			return state;
	}
}
