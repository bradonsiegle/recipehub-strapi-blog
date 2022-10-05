import { FC, ReactChild } from "react";
import styled from "@emotion/styled";

import { boxShadow, borderRadius } from "@/components/styles";

export type TileProps = {
  children?: React.ReactNode;
  /**Header String */
  header: ReactChild;
  maxWidth?: string;
};

const StyledHeader = styled.h2`
  font-family: "Playfair Display", serif;
  text-align: center;
  font-weight: 700;
  font-size: 1.6rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 0 0.6rem;
`;

const Section = styled.section<{ maxWidth?: string }>`
  ${borderRadius};
  width: 100%;
  max-width: 90vw;
  @media (min-width: 768px) {
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "50vw")};
  }
  padding: 2vmin 4vmin 4vmin;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.font.regular};
  ${({ theme }) =>
    boxShadow(theme.components.shadow1, theme.components.shadow2)};
`;

export const Tile: FC<TileProps> = ({
  maxWidth,
  header,
  children,
  ...rest
}) => {
  return (
    <Section {...rest} maxWidth={maxWidth}>
      <StyledHeader>{header}</StyledHeader>
      {children}
    </Section>
  );
};
