import type { NextPage } from 'next';

import { Input } from '@/components/Input';

const Login: NextPage = () => {
	const onSubmit = () => {};

	return (
		<form onSubmit={onSubmit}>
			<Input label='Identifier' placeholder='Username or Email'></Input>
		</form>
	);
};

export default Login;
