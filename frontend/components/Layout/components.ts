import styled from "@emotion/styled";

import { Logo } from "@/components/Logo";
import { Input } from "@/components/Input";
import { StyledLink } from "../StyledLink";

export const Wrapper = styled.div`
  display: grid;
  gap: 0.1rem;
  color: ${({ theme }) => theme.font.regular};
  background-color: ${({ theme }) => theme.background};
  padding: 0.5rem;
  grid-template-areas:
    "header  nav"
    "search  search"
    "content content"
    "footer  footer";
  nav {
    flex-direction: row;
    justify-content: flex-end;
    gap: 5vmin;
  }
  @media (min-width: 500px) {
    grid-template-columns: 1fr 3fr;
  }
  @media (min-width: 960px) {
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-areas:
      "header  search  nav"
      "content content content"
      "footer  footer  footer";
  }
`;

export const LogoLink = styled(StyledLink)`
  padding-right: 1vw;
  padding-left: 2vw;
`;

export const StyledLogo = styled(Logo)`
  grid-area: header;
  display: flex;
  align-items: center;
  height: 4rem;
  justify-content: flex-start;
`;

export const MainNav = styled.nav`
  grid-area: nav;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 2vmin;
`;

export const SearchInput = styled(Input)`
  grid-area: search;
  width: 100%;
  height: 4rem;
`;

export const Content = styled.main`
  grid-area: content;
  min-height: 84vh;
  margin-top: 1.6rem;
`;

export const Footer = styled.footer`
  grid-area: footer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 5rem;
`;
