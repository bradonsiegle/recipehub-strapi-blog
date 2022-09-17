import { render } from '@/test-utils';
import Registration from '@/pages/registration';

describe('Registration page', () => {
	it('should render', () => {
		const { container } = render(<Registration />);
		expect(container).toMatchSnapshot();
	});
});
