import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { FC, useState, useEffect, useLayoutEffect, ChangeEvent } from "react";
import { IconButton } from "@/components/IconButton";
import { ThemeProvider } from "@emotion/react";
import { Themes } from "@/styles/themes";
import { login, selectUser } from "@/services/userSlice";

import {
  Wrapper,
  LogoLink,
  StyledLogo,
  MainNav,
  SearchInput,
  Content,
  Footer,
} from "./components";

interface Props {
  children?: React.ReactNode;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { q } = router.query;
  const [query, setQuery] = useState(q);

  const { username } = useSelector<RootState, RootState["user"]>(selectUser);

  const darkIcon =
    "https://res.cloudinary.com/dxpt2kzgn/image/upload/v1664330144/images/logo_white_aafccv.png";
  const lightIcon =
    "https://res.cloudinary.com/dxpt2kzgn/image/upload/v1664330095/images/logo_black_tqzpce.png";

  const [isDark, setIsDark] = useState(false);
  const [isDarkIcon, setIsDarkIcon] = useState(lightIcon);
  const dispatch = useDispatch<AppDispatch>();

  const toggleDark = () => {
    localStorage.setItem("theme", isDark ? "light" : "dark");
    setIsDark(!isDark);
    setIsDarkIcon(isDark ? lightIcon : darkIcon);
  };

  useIsomorphicLayoutEffect(() => {
    dispatch(login());

    const theme = localStorage.getItem("theme");
    const themeExistsInStorage = Boolean(theme !== null);

    const isDark = themeExistsInStorage
      ? Boolean(theme === "dark")
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(isDark);
  }, []);

  const searchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setQuery(value);
    if (value?.length >= 2) {
      router.push({
        pathname: "/search",
        query: { q: value },
      });
    }
    if (!value) {
      router.push("/");
    }
  };

  useEffect(() => {
    q && setQuery(q);
    if (query && !q) {
      setQuery("");
    }
  }, [q]);

  const theme = Themes[isDark ? "dark" : "light"];

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Link href="/" passHref>
          <LogoLink>
            <StyledLogo size={1.2}>
              <h2>RecipeHub</h2>
            </StyledLogo>
          </LogoLink>
        </Link>
        <MainNav>
          <Link href="/likes" passHref>
            <IconButton name="BiBookmarkHeart" size={1} />
          </Link>

          <Link href={username ? "/user" : "/login"} passHref>
            <IconButton name={username ? "User" : "Login"} size={1} />
          </Link>

          <IconButton
            name={!isDark ? "Moon" : "Sun"}
            size={1}
            onClick={toggleDark}
          />
        </MainNav>
        <SearchInput
          icon="Search"
          placeholder="Find a recipe"
          value={query}
          onChange={searchChange}
        />
        <Content>{children}</Content>
        <Footer>
          <p>© 2022 Bradon Siegle. All rights reserved.</p>
        </Footer>
      </Wrapper>
    </ThemeProvider>
  );
};
