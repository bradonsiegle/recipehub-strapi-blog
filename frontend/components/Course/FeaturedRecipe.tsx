import { FC } from "react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";

import { Course as CourseType } from "@/types";

import { boxShadow, borderRadius } from "../styles";
import { StyledLink } from "@/components/StyledLink";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2vmin;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.font.regular};
  ${borderRadius};
  ${({ theme }) =>
    boxShadow(theme.components.shadow1, theme.components.shadow2)};
`;

const CourseLink = styled(StyledLink)`
  display: flex;
  width: 90vw;
  @media (min-width: 900px) {
    width: 46vw;
  }
`;

const StyledHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
`;

interface Props {
  children: React.ReactNode;
  /**Header string */
  header: string;
  /**Image props */
  imageProps: ImageProps;
  /**Link address */
  link: string;
}

export const FeaturedRecipe: FC<Props> = ({
  children,
  header,
  link,
  imageProps,
}) => (
  <Link href={link} passHref>
    <CourseLink>
      <Section>
        <StyledHeader>{header}</StyledHeader>
        <Image {...imageProps} alt={header} />
        {children}
      </Section>
    </CourseLink>
  </Link>
);

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (min-width: 900px) {
    flex-wrap: nowrap;
  }
  justify-content: center;
  gap: 3vmin;
  margin: 2vh 2vw;
`;
