import { css } from '@emotion/react';

export const GlobalStyles = css`
	html,
	body {
		font-family: 'Poppins', sans-serif;
		margin: 0;
		padding: 0;
		background-color: var(--themeBackgroundColor);
		color: var(--themeColor);
	}
	.responsive {
		@media (min-width: 900px) {
			display: none;
		}
	}
`;
