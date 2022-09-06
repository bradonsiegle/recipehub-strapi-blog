import { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import { expect } from '@storybook/jest';
import { screen, userEvent } from '@storybook/testing-library';

import { Input } from './Input';

export default {
	title: 'Controls/Input',
	component: Input,
	args: {
		placeholder: 'Your name',
		label: 'Name',
	},
} as ComponentMeta<typeof Input>;

export const PrimaryInput: ComponentStoryObj<typeof Input> = {
	play: async ({ args }) => {
		await userEvent.type(screen.getByRole('textbox'), 'String');
		await expect(args.onChange).toHaveBeenCalledTimes(6);
	},
	args: {
		feedback: 'Feedback',
	},
};
