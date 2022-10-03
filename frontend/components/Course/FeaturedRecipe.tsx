import { FC } from "react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { boxShadow, borderRadius } from "../styles";
import { StyledLink } from "@/components/StyledLink";

const CourseLink = styled(StyledLink)`
  display: flex;
  width: 90vw;
  @media (min-width: 900px) {
    width: 46vw;
  }
  margin-bottom: 5vh;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.font.regular};
  ${borderRadius};
  ${({ theme }) =>
    boxShadow(theme.components.shadow1, theme.components.shadow2)};
`;

const StyledHeader = styled.h2`
  font-family: "Playfair Display", serif;
  text-align: center;
  font-weight: 700;
  font-size: 1.6rem;
  margin-top: 1rem;
  margin-bottom: -0.2rem;
  padding: 0 0.6rem;
`;

const StyledContent = styled.div`
  padding: 0 6vmin;
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
        <Image {...imageProps} alt={header} />
        <StyledHeader>{header}</StyledHeader>
        <StyledContent>{children}</StyledContent>
      </Section>
    </CourseLink>
  </Link>
);
