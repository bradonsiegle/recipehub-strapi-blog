import React from 'react';
import { render, screen } from '@/test-utils';
import userEvent from '@testing-library/user-event';

import {
	Button,
	PrimaryButton,
	SecondaryButton,
	DangerButton,
	WarningButton,
} from './Button';

describe('Button test cases', () => {
	it('should render', () => {
		const onClick = jest.fn();
		const { asFragment } = render(<Button onClick={onClick}>Test</Button>);

		expect(asFragment()).toMatchSnapshot();
	});
	it('should render primary button', () => {
		const onClick = jest.fn();
		const { asFragment } = render(
			<PrimaryButton onClick={onClick}>Test</PrimaryButton>
		);

		expect(asFragment()).toMatchSnapshot();
	});
	it('should render secondary button', () => {
		const onClick = jest.fn();
		const { asFragment } = render(
			<SecondaryButton onClick={onClick}>Test</SecondaryButton>
		);

		expect(asFragment()).toMatchSnapshot();
	});
	it('should render danger button', () => {
		const onClick = jest.fn();
		const { asFragment } = render(
			<DangerButton onClick={onClick}>Test</DangerButton>
		);

		expect(asFragment()).toMatchSnapshot();
	});
	it('should render warning button', () => {
		const onClick = jest.fn();
		const { asFragment } = render(
			<WarningButton onClick={onClick}>Test</WarningButton>
		);

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
