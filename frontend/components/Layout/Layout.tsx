import { FC } from 'react';
import Link from 'next/link';

import { IconButton } from '@/components/IconButton';
import { StyledLink } from '../StyledLink';

import {
	Wrapper,
	LogoLink,
	StyledLogo,
	MainNav,
	SearchInput,
	Content,
	Footer,
} from './components';

interface Props {
	children?: React.ReactNode;
	isDark: boolean;
	onThemeToggle: () => void;
}

export const Layout: FC<Props> = ({ children, isDark, onThemeToggle }) => {
	return (
		<Wrapper>
			<Link href='/' passHref>
				<LogoLink>
					<StyledLogo size={3}>
						<span className='logo_short'>CBOX</span>
						<span className='logo_long'>CoursesBox</span>
					</StyledLogo>
				</LogoLink>
			</Link>
			<MainNav>
				<Link href='/all' passHref>
					<StyledLink>All</StyledLink>
				</Link>
				<Link href='/login' passHref>
					<IconButton name='Login' size={1} />
				</Link>
				<IconButton
					name={isDark ? 'Moon' : 'Sun'}
					size={1}
					onClick={onThemeToggle}
				/>
			</MainNav>
			<SearchInput icon='Search' placeholder='Search' onChange={() => null} />
			<Content>{children}</Content>
			<Footer>
				<p>© 2022 Bradon Siegle. All rights reserved.</p>
			</Footer>
		</Wrapper>
	);
};
