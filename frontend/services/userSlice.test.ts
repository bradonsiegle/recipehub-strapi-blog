import { mockUser } from '@/mocks/user';
import { reducer, actions, initialState } from './userSlice';

const updatedState = {
	jwt: mockUser.jwt,
	username: mockUser.user.username,
	email: mockUser.user.email,
};

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
});
