import { FC } from 'react';
import styled from '@emotion/styled';

interface TileProps {
	children?: React.ReactNode;
	header: string;
}

const Section = styled.section``;

export const Tile: FC<TileProps> = ({ header, children }) => {
	return (
		<Section>
			<h2>{header}</h2>
			{children}
		</Section>
	);
};
