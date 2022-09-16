import { render } from '@/test-utils';
import Login from '@/pages/login';

describe('Login page', () => {
	it('should render', () => {
		const { container } = render(<Login />);
		expect(container).toMatchSnapshot();
	});
});
