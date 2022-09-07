import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { Layout } from '@/components/Layout/';
import { ThemeProvider } from '@emotion/react';
import { Themes } from '@/styles/themes';

function MyApp({ Component, pageProps }: AppProps) {
	const theme = Themes['dark'];
	return (
		<ThemeProvider theme={theme}>
			<Layout>
				<Component {...pageProps} />;
			</Layout>
		</ThemeProvider>
	);
}

export default MyApp;
