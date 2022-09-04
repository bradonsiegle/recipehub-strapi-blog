import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button test cases', () => {
	it('should render', () => {
		const onClick = jest.fn();
		const { asFragment } = render(<Button onClick={onClick}>Test</Button>);

		expect(asFragment()).toMatchSnapshot();
	});
});
