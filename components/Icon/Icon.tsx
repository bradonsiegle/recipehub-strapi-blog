import { FC } from 'react';
import { Icons } from './Icons';
import styled from '@emotion/styled';

export type AvaliableIcons = keyof typeof Icons;

type WrapperProps = {
	/** Width and Height of icon */
	size?: string;
};

export type Props = {
	/** Icon name*/
	name: AvaliableIcons;
} & WrapperProps &
	React.SVGProps<SVGSVGElement>;

const Wrapper = styled.div<WrapperProps>`
	color: ${({ theme }) => theme.font.regular};
	width: ${({ size }) => size};
	height: ${({ size }) => size};
`;

export const Icon: FC<Props> = ({ name, size = '2rem', ...rest }) => {
	const Icon = Icons[name];
	const sizes = { width: size, height: size };
	return (
		<Wrapper size={size}>
			<Icon {...sizes} {...rest} />
		</Wrapper>
	);
};
