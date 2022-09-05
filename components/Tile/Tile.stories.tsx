import { ComponentStoryObj, ComponentMeta } from '@storybook/react';

import { Tile } from './Tile';

export default {
	title: 'Content/Tile',
	component: Tile,
} as ComponentMeta<typeof Tile>;

export const BasicTile: ComponentStoryObj<typeof Tile> = {
	args: {
		header: 'Basic Tile',
		children: 'This is a basic tile',
	},
};
