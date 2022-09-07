import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';

import { Layout } from '@/components/Layout/';
import { ThemeProvider } from '@emotion/react';
import { Themes } from '@/styles/themes';

function MyApp({ Component, pageProps }: AppProps) {
	const [isDark, setIsDark] = useState(false);
	const toggleDarkMode = () => setIsDark(!isDark);

	useEffect(() => {
		setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
	}, []);

	const theme = Themes[isDark ? 'dark' : 'light'];
	return (
		<ThemeProvider theme={theme}>
			<Layout isDark={isDark} onThemeToggle={toggleDarkMode}>
				<Component {...pageProps} />;
			</Layout>
		</ThemeProvider>
	);
}

export default MyApp;
