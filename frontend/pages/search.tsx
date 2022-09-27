import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import qs from 'qs';

import { Course as CourseType, Response } from '@/types';

type CoursesResponse = Response<CourseType[]>;

const fetchCourses = async (q: string) => {
	const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

	const query = qs.stringify(
		{
			populate: '*',
			filters: {
				$or: [
					{
						header: {
							$containsi: q,
						},
					},
					{
						subtitle: {
							$containsi: q,
						},
					},
					{
						description: {
							$containsi: q,
						},
					},
				],
			},
		},
		{
			encodeValuesOnly: true,
		}
	);

	const res = await fetch(`${api_url}/courses?${query}`, {
		method: 'GET',
	});

	const result: CoursesResponse = await res.json();

	return result;
};

const header = styled.h3`
	padding: 0 2vmin;
`;

const headerRender = (q: string, courses?: CourseType[], error?: string) => {
	if (error) {
		return error;
	}
	return courses && courses?.length
		? `Search results for "${q}"`
		: `No results for "${q}"`;
};

const Search: NextPage = () => {
	const router = useRouter();
	const { q } = router.query;

	const [courses, setCourses] = useState<CourseType[] | undefined>();
	const [error, setError] = useState<string | undefined>();

	useEffect(() => {
		const fetchData = async () => {
			const { data, error }: CoursesResponse = await fetchCourses(String(q));

			const status = error?.status;

			if (status && (status < 200 || status >= 300)) {
				setError(error.message);
			}

			setCourses(data);
		};
		fetchData();
	}, [q]);

	return <h1>Search results for {q}</h1>;
};

export default Search;
