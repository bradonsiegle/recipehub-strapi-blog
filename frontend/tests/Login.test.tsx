import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import { pageRender as render, screen, act, waitFor } from '@/test-utils';
import { mockUser } from '@/mocks/user';
import Login from '@/pages/login';

jest.mock('next/router', () => ({
	...jest.requireActual('next/router'),
	useRouter: jest.fn(),
}));

describe('Login page', () => {
	it('should render', () => {
		const { container } = render(<Login />);
		expect(container).toMatchSnapshot();
	});
	it('should validate client', async () => {
		render(<Login />);
		const submitButton = screen.getByRole('button', { name: 'Sign In' });

		await act(async () => {
			userEvent.click(submitButton);
		});

		//check for empty field erros
		expect(
			screen.getAllByText('Please enter your username or email')
		).toHaveLength(1);
		expect(screen.getAllByText('Please enter your password')).toHaveLength(1);

		//check for min length errors
		await act(async () => {
			userEvent.type(
				screen.getByRole('textbox', {
					name: 'Identifier Please enter your username or email',
				}),
				'test'
			);
			userEvent.type(
				screen.getByRole('textbox', {
					name: 'Password Please enter your password',
				}),
				'test'
			);
			userEvent.click(submitButton);
		});
		expect(
			screen.getAllByText('Username or email must be at least 6 characters')
		).toHaveLength(1);
		expect(
			screen.getAllByText('Password must be at least 6 characters')
		).toHaveLength(1);

		//check for valid input
		await act(async () => {
			userEvent.type(
				screen.getByRole('textbox', {
					name: 'Identifier Username or email must be at least 6 characters',
				}),
				'validusername'
			);
			userEvent.type(
				screen.getByRole('textbox', {
					name: 'Password Password must be at least 6 characters',
				}),
				'validpassword'
			);
		});

		const alerts = screen.getAllByRole('alert');

		expect(alerts).toHaveLength(3);
		expect(alerts[0]).toMatchSnapshot();
		expect(alerts[1]).toMatchSnapshot();
		expect(alerts[2]).toMatchSnapshot();
	});

	it('Server validation error check', async () => {
		render(<Login />);

		const submitButton = screen.getByRole('button', { name: 'Sign In' });

		act(() => {
			userEvent.type(
				screen.getByRole('textbox', { name: 'Identifier' }),
				'test@test.test'
			);
			userEvent.type(
				screen.getByRole('textbox', { name: 'Password' }),
				'testpassworddd!'
			);
			userEvent.click(submitButton);
		});

		expect(
			await screen.findByText('Invalid identifier or password')
		).toBeInTheDocument();
	});
	it('Successful login check', async () => {
		// Mock the router
		const push = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({
			query: {},
			push,
		});

		render(<Login />);

		const submitButton = screen.getByRole('button', { name: 'Sign In' });

		act(() => {
			userEvent.type(
				screen.getByRole('textbox', { name: 'Identifier' }),
				mockUser.user.email
			);
			userEvent.type(
				screen.getByRole('textbox', { name: 'Password' }),
				mockUser.user.password
			);
			userEvent.click(submitButton);
		});

		// Check if the user is redirected to the user page
		await waitFor(() => expect(push).toHaveBeenCalledWith('/user'));
	});
});
