import { Course as CourseType } from '@/types';
import { RootState } from '@/store';
import {
	createAsyncThunk,
	createSlice,
	PayloadAction,
	SerializedError,
} from '@reduxjs/toolkit';

export type UserState = {
	jwt: string;
	userId: number | null;
	username: string;
	email: string;
	courses: CourseType[];
	requestState?: RequestState;
	error?: SerializedError;
};

type RequestState = 'pending' | 'fulfilled' | 'rejected';

export type LoginData = {
	identifier: string;
	password: string;
};

export type RegistrationData = {
	username: string;
	email: string;
	password: string;
};

type UserPayload = {
	jwt: string;
	user: {
		username: string;
		email: string;
		courses: CourseType[];
		id: number;
	};
};

type likePayload = {
	id: number;
	course: CourseType;
};

export const initialState: UserState = {
	jwt: '',
	userId: null,
	username: '',
	email: '',
	courses: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		like: (state, action: PayloadAction<likePayload>) => {
			console.log('like action');

			state.courses.push(action.payload.course);
			localStorage.setItem('courses', JSON.stringify(state.courses));

			fetch(`${api_url}/users/${state.userId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${state.jwt}`,
				},
				body: JSON.stringify({
					courses: state.courses,
				}),
			});
		},
		unlike: (state, action: PayloadAction<number>) => {
			//remove course from user's courses
			state.courses = state.courses.filter(
				(course) => course.id !== action.payload
			);
			localStorage.setItem('courses', JSON.stringify(state.courses));
			fetch(`${api_url}/users/${state.userId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${state.jwt}`,
				},
				body: JSON.stringify({
					courses: state.courses,
				}),
			});
		},
	},
	extraReducers: (builder) => {
		//logout flow
		builder.addCase(logout.fulfilled, () => initialState);
		//Login/registration flow
		builder
			.addMatcher<PayloadAction<UserPayload>>(
				(action) => /\/(login|registration)\/fulfilled$/.test(action.type),
				(state, { payload }) => {
					state.requestState = 'fulfilled';
					state.jwt = payload.jwt;
					state.username = payload.user.username;
					state.userId = Number(payload.user.id);
					state.email = payload.user.email;
					state.error = undefined;
					state.courses = payload.user.courses;
				}
			)
			.addMatcher(
				(action) => action.type.endsWith('/pending'),
				(state) => {
					state.requestState = 'pending';
				}
			)
			.addMatcher(
				(action) => action.type.endsWith('/rejected'),
				(state, { payload }) => {
					const payloadError = (payload as { error: SerializedError })?.error;
					state.error = payloadError;
					state.requestState = 'rejected';
				}
			);
	},
});

export const { actions, reducer } = userSlice;

export const selectUser = (state: RootState) => state.user;

const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

const clearUserInfoFromLocalStorage = () => {
	localStorage.removeItem('jwt');
	localStorage.removeItem('username');
	localStorage.removeItem('email');
	localStorage.removeItem('userId');
	localStorage.removeItem('courses');
};

const setupUserInfoToLocalStorage = (result: UserPayload) => {
	localStorage.setItem('jwt', result.jwt);
	localStorage.setItem('username', result?.user?.username);
	localStorage.setItem('email', result?.user?.email);
	localStorage.setItem('userId', String(result?.user?.id));
	localStorage.setItem('courses', JSON.stringify(result?.user?.courses));
};

const createRequest = (
	jwt: string | null,
	loginData: LoginData | undefined
) => {
	if (jwt && !loginData) {
		return fetch(`${api_url}/users/me?populate=*`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
	}
	if (loginData) {
		return fetch(`${api_url}/auth/local`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loginData),
		});
	}
	throw { error: 'Invalid login request' };
};

export const login = createAsyncThunk<UserPayload, LoginData | undefined>(
	'user/login',
	async (loginData, { rejectWithValue }) => {
		try {
			const jwt = localStorage.getItem('jwt');

			const response = await createRequest(jwt, loginData);

			const data = await response.json();

			if (response.status < 200 || response.status >= 300) {
				clearUserInfoFromLocalStorage();
				return rejectWithValue(data);
			}

			const result = (jwt ? { jwt, user: data } : data) as UserPayload;

			if (!result.user.courses) {
				const userData = await fetch(
					`${api_url}/users/${result.user.id}?populate=*`,
					{
						headers: {
							Authorization: `Bearer ${result.jwt}`,
						},
					}
				).then((res) => res.json());
				result.user.courses = userData.courses;
			}
			setupUserInfoToLocalStorage(result);

			return result;
		} catch (error) {
			clearUserInfoFromLocalStorage();
			return rejectWithValue(error);
		}
	}
);

export const logout = createAsyncThunk('user/logout', async () => {
	clearUserInfoFromLocalStorage();
});

export const registration = createAsyncThunk<UserPayload, RegistrationData>(
	'user/registration',
	async (data, { rejectWithValue }) => {
		try {
			const response = await fetch(`${api_url}/auth/local/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (response.status < 200 || response.status >= 300) {
				return rejectWithValue(result);
			}

			setupUserInfoToLocalStorage(result);

			return result;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
