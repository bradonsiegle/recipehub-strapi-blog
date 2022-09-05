import { FC } from 'react';
import { Icons } from './icons';

export type AvaliableIcons = keyof typeof Icons;

export type Props = {
	name: AvaliableIcons;
	size: string;
} & React.SVGProps<SVGSVGElement>;

export const Icon: FC<Props> = ({ name, size = '2rem', ...rest }) => {
	const Icon = Icons[name];
	const sizes = { width: size, height: size };
	return <Icon {...sizes} {...rest} />;
};
