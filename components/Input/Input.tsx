import { FC, ChangeEventHandler, InputHTMLAttributes, ReactChild } from 'react';
import styled from '@emotion/styled';

import { Icon, AvailableIcons } from '@/components/Icon';
import { boxShadow } from '../styles';
import { useId } from '@/components/hooks/useId';

type StyledInputProps = {
	withIcon: boolean;
};

const StyledInput = styled.input<StyledInputProps>`
	all: unset;
	width: 20rem;
	height: 4rem;
	border-radius: 1rem;
	font-size: 1.4rem;
	padding-left: ${({ withIcon }) => (withIcon ? 2.8 : 1.4)}rem;
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

const Label = styled.label`
	color: ${({ theme }) => theme.font.regular};
	font-size: 1rem;
	padding-left: 1.4rem;
`;

const StyledIcon = styled(Icon)`
	display: block;
	margin-top: -3rem;
	padding-left: 0.5rem;
	color: ${({ theme }) => theme.font.placeholder};
	opacity: 0.7;
`;

export type Props = {
	/**Input label */
	label: string;
	/**Placeholder */
	placeholder: string;
	/**onCHange handler */
	onChange: ChangeEventHandler<HTMLInputElement>;
	/**Feedback for input */
	feedback?: ReactChild;
	/**Icon to show in input */
	icon?: AvailableIcons;
};

export const Input: FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({
	label,
	icon,
	feedback,
	...props
}) => {
	const fieldId = useId();
	return (
		<Label>
			{label}
			<br />
			<StyledInput withIcon={Boolean(icon)} id={fieldId} {...props} />
			{icon && <StyledIcon name={icon} />}
			<br />
			<Label>{feedback}</Label>
		</Label>
	);
};
