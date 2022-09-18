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
		it("should set the state to 'fufilled' when login is fulfilled", () => {
			const fulfilledState = reducer(
				initialState,
				login.fulfilled(
					{
						jwt: updatedState.jwt,
						user: {
							username: updatedState.username,
							email: updatedState.email,
						},
					},
					requestId,
					loginData
				)
			);
			expect(fulfilledState).toEqual({
				...updatedState,
				requestState: 'fulfilled',
			});
		});
		it("should set the state to 'rejected' when login is rejected", () => {
			const payloadError = {
				error: {
					name: '500',
					message: 'Internal Server Error',
				},
			};
			const rejectedState = reducer(
				initialState,
				login.rejected({} as Error, requestId, loginData, payloadError)
			);
			expect(rejectedState).toEqual({
				...initialState,
				requestState: 'rejected',
				error: payloadError.error,
			});
		});
	});
});
