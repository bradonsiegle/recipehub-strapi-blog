import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Search: NextPage = () => {
	const router = useRouter();
	const { q } = router.query;

	return <h1>Search results for {q}</h1>;
};

export default Search;
