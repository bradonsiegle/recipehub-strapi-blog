import { CourseLink, Section, ImageContainer } from "@/components/Course";
import Image, { ImageProps } from "next/image";
import { FC } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

interface Props {
  /**Header string */
  header: string;
  /**Image props */
  imageProps: ImageProps;
  /**Link address */
  link: string;
}

const StyledHeader = styled.h3`
  text-align: center;
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  margin-top: -1rem;
  padding-bottom: 0.2rem;
  padding-left: 0.6rem;
  padding-right: 0.6rem;
`;

export const CourseCategoryTile: FC<Props> = ({ header, link, imageProps }) => (
  <Link href={link} passHref>
    <CourseLink>
      <Section>
        <ImageContainer>
          <Image {...imageProps} alt={header} objectFit={"cover"} />
        </ImageContainer>
        <StyledHeader>{header}</StyledHeader>
      </Section>
    </CourseLink>
  </Link>
);
