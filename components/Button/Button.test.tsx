import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('Button test cases', () => {
	it('should render', () => {
		const onClick = jest.fn();
		const { asFragment } = render(<Button onClick={onClick}>Test</Button>);

		expect(asFragment()).toMatchSnapshot();
	});
	it('should call onClick callback', async () => {
		const onClick = jest.fn();
		render(<Button onClick={onClick}>Test</Button>);
		const button = screen.getByRole('button');
		await userEvent.click(button);
		expect(onClick).toHaveBeenCalled();
	});
});
