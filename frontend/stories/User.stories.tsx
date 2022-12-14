import User from '@/pages/user';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { mockUser } from '@/mocks/user';
import { rootReducer } from '@/store';

const store = configureStore({
	reducer: rootReducer,
	preloadedState: {
		user: {
			jwt: mockUser.jwt,
			username: mockUser.user.username,
			email: mockUser.user.email,
			userId: mockUser.user.id,
			courses: mockUser.user.courses,
		},
	},
});

export default {
	title: 'Pages/User',
	component: User,
};

export const UserPage = () => (
	<Provider store={store}>
		<User />
	</Provider>
);
