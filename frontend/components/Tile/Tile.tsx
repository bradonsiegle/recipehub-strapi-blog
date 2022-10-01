import { FC, ReactChild } from "react";
import styled from "@emotion/styled";

import { boxShadow, borderRadius } from "@/components/styles";

export type TileProps = {
  children?: React.ReactNode;
  /**Header String */
  header: ReactChild;
};

const Section = styled.section`
  ${borderRadius};
  width: 100%;
  max-width: 90vw;
  padding: 2vmin 4vmin 4vmin;
  background: ${({ theme }) => theme.background};

  color: ${({ theme }) => theme.font.regular};
  ${({ theme }) =>
    boxShadow(theme.components.shadow1, theme.components.shadow2)};
`;

export const Tile: FC<TileProps> = ({ header, children, ...rest }) => {
  return (
    <Section {...rest}>
      <h2>{header}</h2>
      {children}
    </Section>
  );
};
