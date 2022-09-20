import { storeCreator as globalStoreCreator } from '@/store';

import { mockUser, ValidationError } from '@/mocks/user';
import { reducer, initialState, login, logout } from './userSlice';

const rootReducer = {
	user: reducer,
};

const storeCreator = () => globalStoreCreator(rootReducer);

const updatedState = {
	jwt: mockUser.jwt,
	username: mockUser.user.username,
	email: mockUser.user.email,
};

const loginData = {
	identifier: mockUser.user.email,
	password: mockUser.user.password,
};

describe('User slice', () => {
	describe('login async flow', () => {
		beforeEach(() => {
			localStorage.clear();
		});
		it('success login flow', async () => {
			const store = storeCreator();
			const stateBeforeLogin = store.getState();
			expect(stateBeforeLogin).toEqual({
				user: {
					...initialState,
				},
			});
			await store.dispatch(login(loginData));

			const stateAfterLogin = store.getState();
			expect(stateAfterLogin).toEqual({
				user: {
					...updatedState,
					requestState: 'fulfilled',
				},
			});
			expect(localStorage.getItem('jwt')).toBe(updatedState.jwt);
			expect(localStorage.getItem('username')).toBe(updatedState.username);
			expect(localStorage.getItem('email')).toBe(updatedState.email);
		});

		it('failed login flow', async () => {
			const store = storeCreator();
			await store.dispatch(login({ ...loginData, password: 'wrong' }));
			const state = store.getState();

			expect(state).toEqual({
				user: {
					...initialState,
					requestState: 'rejected',
					...ValidationError,
				},
			});
		});

		it('login flow with saved jwt', async () => {
			localStorage.setItem('jwt', mockUser.jwt);

			const store = storeCreator();
			await store.dispatch(login());
			const state = store.getState();

			expect(state).toEqual({
				user: {
					...updatedState,
					requestState: 'fulfilled',
				},
			});
		});
	});

	describe('logout flow', () => {
		it('logout action', async () => {
			//login
			const store = storeCreator();
			await store.dispatch(login(loginData));
			const stateAfterLogin = store.getState();
			expect(stateAfterLogin).toEqual({
				user: {
					...updatedState,
					requestState: 'fulfilled',
				},
			});
			expect(localStorage.getItem('jwt')).toBe(mockUser.jwt);
			expect(localStorage.getItem('username')).toBe(mockUser.user.username);
			expect(localStorage.getItem('email')).toBe(mockUser.user.email);

			//logout
			store.dispatch(logout());

			const stateAfterLogout = store.getState();
			expect(stateAfterLogout).toEqual({
				user: {
					...initialState,
				},
			});
			expect(localStorage.getItem('jwt')).toBe(null);
			expect(localStorage.getItem('username')).toBe(null);
			expect(localStorage.getItem('email')).toBe(null);
		});
	});
});
