import type { NextPage } from 'next';

import { Tile } from '@/components/Tile';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

const Login: NextPage = () => {
	const onSubmit = () => {};

	return (
		<form onSubmit={onSubmit}>
			<Tile header='Login'>
				<Input label='Identifier' placeholder='Username or Email'></Input>
				<Input label='Password' type='password' placeholder='Password'></Input>
				<Button type='submit'>Login</Button>
			</Tile>
		</form>
	);
};

export default Login;
