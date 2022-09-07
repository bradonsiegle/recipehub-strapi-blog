import { FC, ChangeEventHandler, InputHTMLAttributes, ReactChild } from 'react';
import styled from '@emotion/styled';

import { Icon, AvailableIcons } from '@/components/Icon';
import { boxShadow } from '../styles';

const StyledInput = styled.input`
	all: unset;
	width: 100%;
	height: 100%;
	border-radius: 1rem;
	font-size: 1.4rem;
	padding: 0 3.2rem 0 1.4rem;
	color: ${({ theme }) => theme.font.regular};

	${({ theme }) =>
		boxShadow(theme.components.shadow1, theme.components.shadow2, true)};

	&::placeholder {
		color: ${({ theme }) => theme.font.placeholder};
	}

	&:focus {
		${({ theme }) =>
			boxShadow(theme.components.shadow1, theme.components.shadow2)};
		~ svg {
			color: ${({ theme }) => theme.font.regular};
			opacity: 1;
		}
	}
`;

type LabelProps = {
	/**Input height */
	height?: number;
	/**Input width */
	width?: number;
};

const Label = styled.label<LabelProps>`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: ${({ width }) => width}rem;
	height: ${({ height }) => height}rem;
	color: ${({ theme }) => theme.font.regular};
	font-size: 1rem;
`;

const StyledIcon = styled(Icon)`
	position: absolute;
	right: 1rem;
	color: ${({ theme }) => theme.font.placeholder};
	opacity: 0.7;
`;

const InputWrapper = styled.div`
	display: flex;
	position: relative;
	align-items: center;
	width: 100%;
	height: 100%;
`;

const Text = styled.span`
	padding-left: 1.4rem;
`;

export type Props = {
	/**Placeholder */
	placeholder: string;
	/**onCHange handler */
	onChange: ChangeEventHandler<HTMLInputElement>;
	/**Input label */
	label?: string;
	/**Icon to show in input */
	icon?: AvailableIcons;
	/**Feedback for input */
	feedback?: ReactChild;
} & LabelProps;

export const Input: FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({
	label,
	height = 7,
	width = 20,
	icon,
	feedback,
	className,
	...props
}) => {
	return (
		<Label height={height} width={width} className={className}>
			{label && <Text>{label}</Text>}
			<InputWrapper>
				<StyledInput {...props} />
				{icon && <StyledIcon name={icon} />}
			</InputWrapper>
			{feedback && <Text>{feedback}</Text>}
		</Label>
	);
};
