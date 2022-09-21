import Registration from '@/pages/registration';
import { Provider } from 'react-redux';
import { store } from '@/store';

export default {
	title: 'Pages/Registration',
	component: Registration,
};

export const RegistrationPage = () => (
	<Provider store={store}>
		<Registration />
	</Provider>
);
