import { FC } from 'react';
import { Icons } from './Icons';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type AvaliableIcons = keyof typeof Icons;

type WrapperProps = {
	/** Width and Height of icon */
	size?: number;
};

export type Props = {
	/** Icon name*/
	name: AvaliableIcons;
} & WrapperProps &
	React.SVGProps<SVGSVGElement>;

const Wrapper = styled.div<WrapperProps>`
	color: ${({ theme }) => theme.font.regular};
	${({ size }) => {
		const sizeRem = `${size}rem`;
		return css`
			width: ${sizeRem};
			height: ${sizeRem};
		`;
	}}
`;

export const Icon: FC<Props> = ({ name, size = 2, ...rest }) => {
	const Icon = Icons[name];
	const sizeInRem = `${size}rem`;
	const sizes = { width: sizeInRem, height: sizeInRem };
	return (
		<Wrapper size={size}>
			<Icon {...sizes} {...rest} />
		</Wrapper>
	);
};
