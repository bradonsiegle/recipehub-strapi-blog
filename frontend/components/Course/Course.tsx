import { FC } from "react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";

import { Course as CourseType } from "@/types";

import { boxShadow, borderRadius } from "../styles";
import { StyledLink } from "@/components/StyledLink";

export const Section = styled.section`
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

export const CourseLink = styled(StyledLink)`
  display: flex;
  justify-content: center;
  width: 90vw;
  @media (min-width: 768px) {
    width: 390px;
  }
`;

const StyledHeader = styled.h3`
  text-align: center;
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  margin-top: -1rem;
  margin-bottom: 0;
`;

const StyledDate = styled.p`
  text-align: center;
  font-size: 0.8rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

export const ImageContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  width: 90vw;
  height: 70vw;

  @media (min-width: 768px) {
    width: 390px;
    height: 260px;
  }
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

export const Course: FC<Props> = ({ children, header, link, imageProps }) => (
  <Link href={link} passHref>
    <CourseLink>
      <Section>
        <ImageContainer>
          <Image {...imageProps} alt={header} objectFit={"cover"} />
        </ImageContainer>
        <StyledHeader>{header}</StyledHeader>
        {children}
      </Section>
    </CourseLink>
  </Link>
);

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  gap: 6vmin;
  margin: 2vh 2vw;
`;

export const Courses: FC<{ courses: CourseType[]; strapi_url: string }> = ({
  courses,
  strapi_url,
}) => (
  <Wrapper>
    {courses?.map(
      ({
        id,
        attributes: {
          header,
          subtitle,
          publishedAt,
          cover: {
            data: {
              attributes: {
                formats: {
                  medium: { url, width, height },
                },
              },
            },
          },
        },
      }) => (
        <Course
          key={id}
          header={header}
          link={`/course/${id}`}
          imageProps={{
            width,
            height,
            alt: `Cover for ${header}`,
            src: `${url}`,
            style: { borderRadius: "1rem" },
          }}
        >
          <time dateTime={publishedAt}>
            <StyledDate>{new Date(publishedAt).toDateString()}</StyledDate>
          </time>
        </Course>
      )
    )}
  </Wrapper>
);
