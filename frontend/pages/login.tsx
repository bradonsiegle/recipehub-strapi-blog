import type { NextPage } from 'next';

import { CenteredTile } from '@/components/Tile';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

const Login: NextPage = () => {
	const onSubmit = () => {};

	return (
		<form onSubmit={onSubmit}>
			<CenteredTile header='Login'>
				<Input label='Identifier' placeholder='Username or Email'></Input>
				<Input label='Password' type='password' placeholder='Password'></Input>
				<Button type='submit'>Login</Button>
			</CenteredTile>
		</form>
	);
};

export default Login;
