import type { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { CenteredTile } from '@/components/Tile';
import { selectUser, logout } from '@/services/userSlice';

import { Course as CourseType, Response } from '@/types';
import { Courses } from '@/components/Course';

type CoursesResponse = Response<CourseType[]>;

const strapi_url = process.env.NEXT_PUBLIC_STRAPI_URL;

export const getStaticProps: GetStaticProps = async () => {
	const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

	const response = await fetch(`${api_url}/courses?populate=*`, {
		method: 'GET',
	});

	const { data: courses, meta, error }: CoursesResponse = await response.json();

	const status = error?.status;

	if (status && (status < 200 || status >= 300)) {
		return {
			props: {
				courses: [],
				meta: {},
			},
		};
	}

	return {
		props: {
			courses,
			meta,
		},
		revalidate: 60,
	};
};

const Likes: NextPage<{ courses: CourseType[]; error?: string }> = ({
	courses,
}) => {
	const router = useRouter();

	const dispatch = useDispatch<AppDispatch>();

	const { username, email, error, likes } = useSelector<
		RootState,
		RootState['user']
	>(selectUser);

	console.log('before', courses);

	const likedCourses = courses.filter((course) => likes.includes(course.id));

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
		<>
			<CenteredTile header='Liked Recipes'>
				{likedCourses.length >= 1 ? (
					<Courses courses={likedCourses} strapi_url={String(strapi_url)} />
				) : (
					<h3>No liked recipes</h3>
				)}
			</CenteredTile>
		</>
	) : null;
};

export default Likes;
