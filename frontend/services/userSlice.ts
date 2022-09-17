import { createSlice } from '@reduxjs/toolkit';

export type UserState = {
	jwt: string;
	username: string;
	email: string;
};

const initialState: UserState = {
	jwt: '',
	username: '',
	email: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// setUser: (state, action) => {
		//     state.jwt = action.payload.jwt;
		//     state.username = action.payload.username;
		//     state.email = action.payload.email;
		// },
	},
});
