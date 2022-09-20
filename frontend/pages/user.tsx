import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { CenteredTile } from '@/components/Tile';
import { Button } from '@/components/Button';
import { selectUser, logout } from '@/services/userSlice';

const User: NextPage = () => {
	const router = useRouter();

	const { username, email, error } = useSelector<RootState, RootState['user']>(
		selectUser
	);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!username || Boolean(error)) {
			dispatch(logout());
			router.push('/login');
		}
	}, []);

	const logoutHandler = () => {
		dispatch(logout());
		router.push('/');
	};

	return username && email ? (
		<CenteredTile header='Profile'>
			<h3>Username: {username}</h3>
			<h3>Email: {email}</h3>
			<Button onClick={logoutHandler}>Logout</Button>
		</CenteredTile>
	) : null;
};

export default User;
