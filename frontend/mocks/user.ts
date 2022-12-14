export const mockUser = {
	jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYzNDU4OTAyLCJleHAiOjE2NjYwNTA5MDJ9.J_igUH_g2OQQvIdvoSdi6mZD_zg3TU_PHuoKOi1v3xg',
	user: {
		id: 2,
		username: 'John Doe',
		email: 'john@doe.com',
		password: 'secret',
		courses: [],
		provider: 'local',
		confirmed: true,
		blocked: false,
		createdAt: '2022-09-16T02:18:59.517Z',
		updatedAt: '2022-09-16T02:18:59.517Z',
	},
};

export const ValidationError = {
	error: {
		status: 400,
		name: 'ValidationError',
		message: 'Invalid identifier or password',
		details: {},
	},
};

export const RegistrationError = {
	error: {
		status: 400,
		name: 'ApplicationError',
		message: 'An error occurred during account creation',
		details: {},
	},
};
