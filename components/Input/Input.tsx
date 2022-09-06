import { FC, ChangeEventHandler, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

import { boxShadow } from '../styles';
import { useId } from '@/components/hooks/useId';

const StyledInput = styled.input`
	all: unset;
	width: 20rem;
	height: 4rem;
	border-radius: 1rem;
	font-size: 1.4rem;
	padding-left: 1.4rem;
	color: ${({ theme }) => theme.font.regular};

	${({ theme }) =>
		boxShadow(theme.components.shadow1, theme.components.shadow2, true)};

	&::placeholder {
		color: ${({ theme }) => theme.font.placeholder};
	}

	&:focus {
		${({ theme }) =>
			boxShadow(theme.components.shadow1, theme.components.shadow2)};
	}
`;

const Label = styled.label`
	color: ${({ theme }) => theme.font.regular};
	font-size: 1rem;
	padding-left: 1.4rem;
`;

export type Props = {
	/**Input label */
	label: string;
	/**Placeholder */
	placeholder: string;
	/**onCHange handler */
	onChange: ChangeEventHandler<HTMLInputElement>;
	/**Feedback for input */
	feedback?: string;
};

export const Input: FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({
	label,
	feedback,
	...props
}) => {
	const fieldId = useId();
	return (
		<Label>
			{label}
			<br />
			<StyledInput id={fieldId} {...props} />
			<br />
			<Label htmlFor={fieldId}>{feedback}</Label>
		</Label>
	);
};
