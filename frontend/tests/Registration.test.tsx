import { render, screen, act, waitFor } from '@/test-utils';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';

import { mockUser } from '@/mocks/user';

import Registration from '@/pages/registration';

jest.mock('next/router', () => ({
	...jest.requireActual('next/router'),
	useRouter: jest.fn().mockReturnValue({
		query: {},
		push: jest.fn(),
	}),
}));

describe('Registration page', () => {
	it('Render check', () => {
		const { container } = render(<Registration />);
		expect(container).toMatchSnapshot();
	});
	it('Client validation check', async () => {
		render(<Registration />);

		const submitButton = screen.getByRole('button', { name: 'Sign Up' });

		await act(async () => {
			userEvent.click(submitButton);
		});

		await act(async () => {
			userEvent.type(
				screen.getByRole('textbox', { name: 'username Username is required' }),
				'test'
			);
			userEvent.type(
				screen.getByRole('textbox', { name: 'email Email is required' }),
				'test'
			);
			userEvent.type(
				screen.getByRole('textbox', { name: 'password Password is required' }),
				'test'
			);
		});

		expect(
			screen.getByText('Username must be at least 6 characters long')
		).toBeInTheDocument();
		expect(screen.getByText('Email is invalid')).toBeInTheDocument();
		expect(
			screen.getByText('Password must be at least 6 characters long')
		).toBeInTheDocument();

		await act(async () => {
			userEvent.type(
				screen.getByRole('textbox', {
					name: 'username Username must be at least 6 characters long',
				}),
				'test--!'
			);
			userEvent.type(
				screen.getByRole('textbox', { name: 'email Email is invalid' }),
				'test@test'
			);
			userEvent.type(
				screen.getByRole('textbox', {
					name: 'password Password must be at least 6 characters long',
				}),
				'testtest!'
			);
		});

		expect(
			screen.getByText('Username must contain only letters and numbers')
		).toBeInTheDocument();

		await act(async () => {
			const usernameInput = screen.getByRole('textbox', {
				name: 'username Username must contain only letters and numbers',
			});
			userEvent.clear(usernameInput);
			userEvent.type(usernameInput, 'testtesttest');
		});

		const alerts = screen.getAllByRole('alert');

		expect(alerts).toHaveLength(3);
		expect(alerts[0]).toMatchSnapshot();
		expect(alerts[1]).toMatchSnapshot();
		expect(alerts[2]).toMatchSnapshot();
	});

	it('Server validation error check', async () => {
		render(<Registration />);

		const submitButton = screen.getByRole('button', { name: 'Sign Up' });

		act(() => {
			userEvent.type(
				screen.getByRole('textbox', { name: 'username' }),
				'testtest'
			);
			userEvent.type(
				screen.getByRole('textbox', { name: 'email' }),
				'test@test.test'
			);
			userEvent.type(
				screen.getByRole('textbox', { name: 'password' }),
				'testtest!'
			);
			userEvent.click(submitButton);
		});

		expect(
			await screen.findByText('An error occurred during account creation')
		).toBeInTheDocument();
	});
	it('Successful registration check', async () => {
		// Mock the router
		const push = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({
			query: {},
			push,
		});

		render(<Registration />);

		const submitButton = screen.getByRole('button', { name: 'Sign Up' });

		act(() => {
			userEvent.type(
				screen.getByRole('textbox', { name: 'username' }),
				mockUser.user.username
			);
			userEvent.type(
				screen.getByRole('textbox', { name: 'email' }),
				mockUser.user.email
			);
			userEvent.type(
				screen.getByRole('textbox', { name: 'password' }),
				mockUser.user.password
			);
			userEvent.click(submitButton);
		});

		// Check if the user is redirected to the user page
		await waitFor(() => expect(push).toHaveBeenCalled);
	});
});
