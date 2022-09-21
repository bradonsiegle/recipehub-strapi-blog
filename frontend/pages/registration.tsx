import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '@/store';
import {
	selectUser,
	registration,
	RegistrationData,
} from '@/services/userSlice';

import { CenteredTile } from '@/components/Tile';
import { Input, ConditionalFeedback } from '@/components/Input';
import { Button } from '@/components/Button';
import { StyledLink } from '@/components/StyledLink';

const StyledInput = styled(Input)`
	margin-bottom: 1rem;
`;

const Registration: NextPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegistrationData>();

	const router = useRouter();

	const dispatch = useDispatch<AppDispatch>();
	const { jwt, error } = useSelector<RootState, RootState['user']>(selectUser);

	if (Boolean(jwt) && !error) {
		router.push('/user');
	}

	const onSubmit = (data: RegistrationData) => {
		dispatch(registration(data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<CenteredTile header='Create an account'>
				<h3>
					<ConditionalFeedback>{error?.message}</ConditionalFeedback>
				</h3>
				<StyledInput
					label='username'
					placeholder='username'
					feedback={
						<ConditionalFeedback>
							{errors.username?.message}
						</ConditionalFeedback>
					}
					{...register('username', {
						required: 'Username is required',
						minLength: {
							value: 6,
							message: 'Username must be at least 6 characters long',
						},
						pattern: {
							value: /^[a-zA-Z0-9]+$/,
							message: 'Username must contain only letters and numbers',
						},
					})}
				/>
				<StyledInput
					label='email'
					placeholder='email'
					feedback={
						<ConditionalFeedback>{errors.email?.message}</ConditionalFeedback>
					}
					{...register('email', {
						required: 'Email is required',
						pattern: {
							value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
							message: 'Email is invalid',
						},
					})}
				/>
				<StyledInput
					label='password'
					placeholder='password'
					type='password'
					feedback={
						<ConditionalFeedback>
							{errors.password?.message}
						</ConditionalFeedback>
					}
					{...register('password', {
						required: 'Password is required',
						minLength: {
							value: 6,
							message: 'Password must be at least 6 characters long',
						},
						// pattern: {
						//     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
						//     message:
						//         'Password must contain at least one uppercase letter, one lowercase letter, and one number',
						// },
					})}
				/>
				<Button type='submit'>Register</Button>
				<h3>
					Already have an account?{' '}
					<Link href='/login' passHref>
						<StyledLink underline>Login</StyledLink>
					</Link>
				</h3>
			</CenteredTile>
		</form>
	);
};

export default Registration;
