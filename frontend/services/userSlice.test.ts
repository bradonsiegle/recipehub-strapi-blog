import { storeCreator } from '@/store';

import { mockUser, ValidationError } from '@/mocks/user';
import { reducer, actions, initialState, login } from './userSlice';

const updatedState = {
	jwt: mockUser.jwt,
	username: mockUser.user.username,
	email: mockUser.user.email,
};

const loginData = {
	identifier: mockUser.user.email,
	password: mockUser.user.password,
};

const requestId = 'requestId';

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
});
