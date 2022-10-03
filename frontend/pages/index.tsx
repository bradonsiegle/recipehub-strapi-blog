import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { Course as CourseType, Response } from "@/types";
import styled from "@emotion/styled";
import { Courses } from "@/components/Course";
import { CenteredTile } from "@/components/Tile";
import { FeaturedRecipe } from "@/components/Course";

type CoursesResponse = Response<CourseType[]>;

const StyledHeader = styled.h2`
  font-family: "Playfair Display", serif;
  text-align: center;
  font-weight: 700;
  font-size: 1.6rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
  padding: 0 0.6rem;
`;

const Subtitle = styled.h3`
  font-size: 1rem;
  font-weight: 400;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

export const getStaticProps: GetStaticProps = async () => {
  const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  const response = await fetch(`${api_url}/courses?populate=*`, {
    method: "GET",
  });

  const { data: courses, meta, error }: CoursesResponse = await response.json();

  const status = error?.status;

  if (status && (status < 200 || status >= 300)) {
    return {
      props: {
        courses: [],
        meta: {},
      },
    };
  }

  //FeaturedCourse is always the first course in the array
  const featuredCourse = courses.shift();

  return {
    props: {
      featuredCourse,
      courses,
      meta,
    },
    revalidate: 60,
  };
};

const strapi_url = process.env.NEXT_PUBLIC_STRAPI_URL;

const Home: NextPage<{ courses: CourseType[]; featuredCourse: CourseType }> = ({
  courses,
  featuredCourse,
}) => (
  <>
    <Head>
      <title>RecipeHub</title>
      <meta name="description" content="IT courses for everyone" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <StyledDiv>
      <FeaturedRecipe
        header={featuredCourse.attributes.header}
        link={`/course/${featuredCourse.id}`}
        imageProps={{
          width: `${featuredCourse.attributes.cover.data.attributes.formats.medium.width}`,
          height: `${featuredCourse.attributes.cover.data.attributes.formats.medium.height}`,
          src: `${strapi_url}${featuredCourse.attributes.cover.data.attributes.formats.medium.url}`,
          alt: `Cover for ${featuredCourse.attributes.header}`,
          style: { borderRadius: "1rem" },
        }}
      >
        <Subtitle>{featuredCourse.attributes.subtitle}</Subtitle>
      </FeaturedRecipe>
    </StyledDiv>
    <StyledHeader>All recipes:</StyledHeader>
    <Courses courses={courses} strapi_url={String(strapi_url)} />
  </>
);

export default Home;
