import { expect } from '@storybook/jest';
import { ComponentStoryObj, ComponentMeta } from '@storybook/react';
import { screen } from '@storybook/testing-library';

import { Tile } from './Tile';

export default {
	title: 'Content/Tile',
	component: Tile,
} as ComponentMeta<typeof Tile>;

export const BasicTile: ComponentStoryObj<typeof Tile> = {
	play: async ({ args }) => {
		await expect(screen.getByRole('heading')).toBeInTheDocument();
	},
	args: {
		header: 'Basic Tile',
		children: 'This is a basic tile',
	},
};
