import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { Course as CourseType, Response } from "@/types";
import styled from "@emotion/styled";
import { CourseCategoryTile, Courses } from "@/components/Course";
import { FeaturedRecipe } from "@/components/Course";
import { Button } from "@/components/Button";
import { useState } from "react";
import { useRouter } from "next/router";

type CoursesResponse = Response<CourseType[]>;

const OrderDiv = styled.div<{ order: number; largeDeviceOrder: number }>`
  order: ${({ order }) => order};
  @media (min-width: 768px) {
    order: ${({ largeDeviceOrder }) => largeDeviceOrder};
  }
`;

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
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
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
}) => {
  const router = useRouter();
  const [showAllCourses, setShowAllCourses] = useState(false);
  return (
    <>
      <Head>
        <title>RecipeHub</title>
        <meta name="description" content="IT courses for everyone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledDiv>
        <OrderDiv order={2} largeDeviceOrder={1}>
          <CourseCategoryTile
            header={"Need dinner ideas? We've got you covered!"}
            link="/search?q=dinner"
            imageProps={{
              src: "https://res.cloudinary.com/dxpt2kzgn/image/upload/v1665080425/images/caprese-chicken-saltimbocca1-1658266242.jpg_wtdpph.jpg",
              height: 260,
              width: 390,
              style: { borderRadius: "0.5rem" },
            }}
          />
        </OrderDiv>
        <OrderDiv order={1} largeDeviceOrder={2}>
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
        </OrderDiv>
        <OrderDiv order={3} largeDeviceOrder={3}>
          <CourseCategoryTile
            header={"Explore easy-to-make cocktails! Home mixology 101."}
            link="/search?q=cocktail"
            imageProps={{
              src: "https://res.cloudinary.com/dxpt2kzgn/image/upload/v1665080521/images/summer-cocktails-24374-3_ixzrac.jpg",
              height: 260,
              width: 390,
              style: { borderRadius: "0.5rem" },
            }}
          />
        </OrderDiv>
      </StyledDiv>
      <hr
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
        className="responsive"
      />

      <StyledHeader>Our lastest recipes</StyledHeader>
      <Courses
        courses={courses.slice(0, 8).reverse()}
        strapi_url={String(strapi_url)}
      />

      {showAllCourses && (
        <Courses
          courses={courses.slice(8).reverse()}
          strapi_url={String(strapi_url)}
        />
      )}
      <StyledDiv>
        <Button
          onClick={() => {
            setShowAllCourses(!showAllCourses);
          }}
          style={{ marginTop: "2rem" }}
        >
          {showAllCourses ? "Show less" : "Show more"}
        </Button>
      </StyledDiv>
    </>
  );
};

export default Home;
