import { render, screen } from '@/test-utils';

import { Logo } from './Logo';

describe('Logo test cases', () => {
	it('Should render logo', () => {
		const { asFragment } = render(<Logo>CoursesBox</Logo>);
		expect(asFragment()).toMatchSnapshot();
	});
	it('Should render logo with custom size', () => {
		const { asFragment } = render(<Logo size={5}>CoursesBox</Logo>);
		expect(asFragment()).toMatchSnapshot();
	});
});
