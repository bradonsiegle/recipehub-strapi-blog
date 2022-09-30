import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { Course as CourseType, Response } from "@/types";
import styled from "@emotion/styled";
import { Courses } from "@/components/Course";
import { CenteredTile } from "@/components/Tile";
import { FeaturedRecipe } from "@/components/Course";

type CoursesResponse = Response<CourseType[]>;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
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
    <CenteredTile header="Recipe Of The Week">
      <FeaturedRecipe
        header={featuredCourse.attributes.header}
        link={`/course/${featuredCourse.id}`}
        imageProps={{
          width:
            featuredCourse.attributes.cover.data.attributes.formats.medium
              .width,
          height:
            featuredCourse.attributes.cover.data.attributes.formats.medium
              .height,
          src: `${strapi_url}${featuredCourse.attributes.cover.data.attributes.formats.medium.url}`,
          alt: `Cover for ${featuredCourse.attributes.header}`,
        }}
      >
        {featuredCourse.attributes.subtitle}
      </FeaturedRecipe>
    </CenteredTile>
    <Heading>All recipes:</Heading>
    <Courses courses={courses} strapi_url={String(strapi_url)} />
  </>
);

export default Home;
