import { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import { screen, userEvent } from '@storybook/testing-library';

import { IconButton } from './IconButton';

export default {
	title: 'Controls/IconButton',
	component: IconButton,
} as ComponentMeta<typeof IconButton>;

export const BasicIconButton: ComponentStoryObj<typeof IconButton> = {
	play: async ({ args }) => {
		await userEvent.click(screen.getByRole('button'));
	},
	args: {
		name: 'Home',
	},
};
