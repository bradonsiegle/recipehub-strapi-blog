import { render } from '@/test-utils';
import { Icon } from './Icon';

describe('Icon test case', () => {
	it('Icon should render', () => {
		const { asFragment } = render(<Icon name='Moon' />);
		expect(asFragment()).toMatchSnapshot();
	});
});
