import { FC } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { Tile, TileProps } from "./Tile";

const CommonStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  ${CommonStyles};
  margin-top: 1rem;
  h2 {
    text-align: center;
  }
`;

const StyledTile = styled(Tile)`
  ${CommonStyles};
  flex-flow: column;
`;

export const CenteredTile: FC<TileProps> = ({
  maxWidth,
  children,
  header,
  ...rest
}) => {
  return (
    <Wrapper {...rest}>
      <StyledTile header={header} maxWidth={maxWidth}>
        {children}
      </StyledTile>
    </Wrapper>
  );
};
