import { FC } from "react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import { boxShadow, borderRadius } from "../styles";
import { StyledLink } from "@/components/StyledLink";

const CourseLink = styled(StyledLink)`
  display: flex;
  justify-content: center;
  width: 90vw;
  @media (min-width: 768px) {
    width: 500px;
    margin-top: 1rem;
  }
  margin-bottom: 1rem;
`;

const Section = styled.section`
  position: relative;
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
  margin-bottom: -1rem;
  padding: 0 0.6rem;
`;

const StyledContent = styled.div`
  text-align: center;

  @media (min-width: 768px) {
    padding: 1rem 5rem;
  }
  padding: 1rem 2rem;
  opacity: 0.9;
`;

const FeaturedTag = styled.span`
  font-family: "Playfair Display", serif;
  font-size: 1rem;
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
  position: absolute;
  background: ${({ theme }) => theme.background};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 700;
  top: 1rem;
  right: 1rem;
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
        <FeaturedTag>Featured</FeaturedTag>
        <StyledHeader>{header}</StyledHeader>
        <StyledContent>{children}</StyledContent>
      </Section>
    </CourseLink>
  </Link>
);
