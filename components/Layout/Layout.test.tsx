import { render } from '@/test-utils';

import { Layout } from './Layout';

describe('Layout test cases', () => {
	const child = (
		<>
			<h1>Main Article</h1>
			<p>Some text</p>
		</>
	);

	it('should render the layout', () => {
		const { container } = render(
			<Layout isDark onThemeToggle={() => undefined}>
				{child}
			</Layout>
		);
		expect(container).toMatchSnapshot();
	});
});
