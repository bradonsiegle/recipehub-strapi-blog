import { configureStore } from '@reduxjs/toolkit';

import { mockUser, ValidationError, RegistrationError } from '@/mocks/user';
import {
	reducer,
	initialState,
	login,
	logout,
	registration,
} from './userSlice';

const storeCreator = () => configureStore({ reducer: { user: reducer } });

const updatedState = {
	jwt: mockUser.jwt,
	username: mockUser.user.username,
	email: mockUser.user.email,
	userId: mockUser.user.id,
	courses: mockUser.user.courses,
};

const loginData = {
	identifier: mockUser.user.email,
	password: mockUser.user.password,
};

const registrationData = {
	username: mockUser.user.username,
	email: mockUser.user.email,
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
		beforeEach(() => {
			localStorage.clear();
		});
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
			await store.dispatch(logout());

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

	describe('registration state flow', () => {
		it('fail registration flow', async () => {
			const store = storeCreator();
			await store.dispatch(
				registration({
					email: 'testemail',
					username: 'testuser',
					password: 'wrongpassword',
				})
			);
			const state = store.getState();

			expect(state).toEqual({
				user: {
					jwt: '',
					username: '',
					email: '',
					userId: null,
					courses: [],
					...RegistrationError,
					requestState: 'rejected',
				},
			});
			// Check that the data is stored in localStorage
			expect(localStorage.getItem('jwt')).toBe(null);
			expect(localStorage.getItem('username')).toBe(null);
			expect(localStorage.getItem('email')).toBe(null);
		});
		it('success registration flow', async () => {
			const store = storeCreator();
			await store.dispatch(registration(registrationData));
			const state = store.getState();

			expect(state).toEqual({
				user: {
					...updatedState,
					requestState: 'fulfilled',
				},
			});
			// Check that the data is stored in localStorage
			expect(localStorage.getItem('jwt')).toBe(mockUser.jwt);
			expect(localStorage.getItem('username')).toBe(mockUser.user.username);
			expect(localStorage.getItem('email')).toBe(mockUser.user.email);
		});
	});
});
