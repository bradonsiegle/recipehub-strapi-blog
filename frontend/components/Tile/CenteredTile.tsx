import { FC } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Tile, TileProps } from './Tile';

const CommonStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Wrapper = styled.div`
	${CommonStyles};
	margin-top: 1rem;
`;

const StyledTile = styled(Tile)`
	${CommonStyles};
	flex-flow: column;
`;

export const CenteredTile: FC<TileProps> = ({ children, header, ...rest }) => {
	return (
		<Wrapper {...rest}>
			<StyledTile header={header}>{children}</StyledTile>
		</Wrapper>
	);
};
