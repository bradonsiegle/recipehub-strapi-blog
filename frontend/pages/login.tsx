import type { NextPage } from 'next';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

import { CenteredTile } from '@/components/Tile';
import { Input, Feedback } from '@/components/Input';
import { Button } from '@/components/Button';
import { StyledLink } from '@/components/StyledLink';

const StyledInput = styled(Input)`
	margin-bottom: 1rem;
`;

export type LoginForm = {
	identifier: string;
	password: string;
};

const Login: NextPage = () => {
	const onSubmit = (data: LoginForm) => {
		console.log(data);
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<CenteredTile header='Login'>
				<StyledInput
					label='Identifier'
					placeholder='Username or Email'
					feedback={
						errors.identifier ? <Feedback>Min length 6!</Feedback> : <>&nbsp;</>
					}
					{...register('identifier', {
						required: true,
						minLength: 6,
					})}
					height={8}
				></StyledInput>
				<StyledInput
					label='Password'
					type='password'
					placeholder='Password'
					feedback={
						errors.password ? <Feedback>Min length 6!</Feedback> : <>&nbsp;</>
					}
					{...register('password', {
						required: true,
						minLength: 6,
					})}
					height={8}
				></StyledInput>
				<Button type='submit'>Login</Button>
				<h3>
					<Link href='/registration' passHref>
						<StyledLink underline>Create Account</StyledLink>
					</Link>
				</h3>
			</CenteredTile>
		</form>
	);
};

export default Login;
