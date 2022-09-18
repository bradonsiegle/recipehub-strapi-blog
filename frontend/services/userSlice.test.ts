import { mockUser } from '@/mocks/user';
import { reducer, actions, initialState, login } from './userSlice';

const updatedState = {
	jwt: mockUser.jwt,
	username: mockUser.user.username,
	email: mockUser.user.email,
};

const loginData = {
	identifier: mockUser.user.username,
	password: mockUser.user.password,
};

const requestId = 'requestId';

describe('User slice', () => {
	describe('Update state actions', () => {
		it('should update the state', () => {
			const state = reducer(initialState, actions.update(updatedState));
			expect(state).toEqual(updatedState);
		});

		it('should update only the jwt', () => {
			const state = reducer(
				initialState,
				actions.update({ jwt: updatedState.jwt })
			);
			expect(state).toEqual({ ...initialState, jwt: updatedState.jwt });
		});

		it('should clear the state', () => {
			const stateWithValues = reducer(
				initialState,
				actions.update(updatedState)
			);
			expect(stateWithValues).toEqual(updatedState);

			const state = reducer(stateWithValues, actions.clear());
			expect(state).toEqual(initialState);
		});
	});
	describe('Login state flow', () => {
		it("should set the state to 'pending' when login is pending", () => {
			const pendingState = reducer(
				initialState,
				login.pending(requestId, loginData)
			);
			expect(pendingState).toEqual({
				...initialState,
				requestState: 'pending',
			});
		});
	});
});
