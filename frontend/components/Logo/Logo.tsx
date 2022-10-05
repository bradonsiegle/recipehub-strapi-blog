import styled from "@emotion/styled";
import { css } from "@emotion/react";

export type LogoProps = { /** Logo size in rem */ size?: number };

export const Logo = styled.header<LogoProps>`
  font-family: "Playfair Display", serif;
  font-size: ${({ size = 3 }) => `${size}rem`};
  @media (min-width: 768px) {
    font-size: ${({ size = 3 }) => `${size + 0.4}rem`};
  }
  ${({ theme, size = 3 }) => {
    return css`
      color: ${theme.font.logo};
      text-shadow: 0 0 0.3rem ${theme.font.logoShadow1},
        0 0 ${0.05 * size}rem ${theme.font.logoShadow2},
        0 0 ${0.07 * size}rem ${theme.font.logoShadow2},
        0 0 ${0.08 * size}rem ${theme.font.logoShadow2},
        0 0 ${0.1 * size}rem ${theme.font.logoShadow2};
    `;
  }}
`;
