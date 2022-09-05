import { render } from '@testing-library/react';
import { Icon } from './Icon';

describe('Icon', () => {
	it('Icon should render', () => {
		const { asFragment } = render(<Icon name='Moon' />);
		expect(asFragment()).toMatchSnapshot();
	});
});
