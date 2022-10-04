import type { NextPage, GetStaticProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { selectUser } from "@/services/userSlice";

import { BiHeartCircle } from "react-icons/bi";
import styled from "@emotion/styled";

import { Course as CourseType, Response } from "@/types";
import { Courses } from "@/components/Course";

type CoursesResponse = Response<CourseType[]>;

const StyledHeader = styled.h2`
  font-family: "Playfair Display", serif;
  text-align: center;
  margin-bottom: 10vmin;
`;

const StyledParagraph = styled.p`
  text-align: center;
  margin-bottom: 10vmin;
`;

const strapi_url = process.env.NEXT_PUBLIC_STRAPI_URL;

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

  return {
    props: {
      courses,
      meta,
    },
    revalidate: 60,
  };
};

const Likes: NextPage<{ courses: CourseType[]; error?: string }> = ({
  courses,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    username,
    email,
    courses: likedCourses,
  } = useSelector<RootState, RootState["user"]>(selectUser);

  //map over likedCourses and return all id in new array
  const likedCoursesIds = likedCourses.map((course) => course.id);

  //filter courses array and return only courses that match the id of likedCourses
  const likedCoursesArray = courses.filter((course) =>
    likedCoursesIds.includes(course.id)
  );

  return username && email ? (
    <>
      {likedCourses.length >= 1 ? (
        <>
          <StyledHeader>Your liked recipes</StyledHeader>
          <Courses
            courses={likedCoursesArray}
            strapi_url={String(strapi_url)}
          />
        </>
      ) : (
        <>
          <StyledHeader>You have no liked recipes</StyledHeader>
          <StyledParagraph>
            You can like recipes by clicking on the heart icon on any recipe
            page{" "}
            <BiHeartCircle size={22} style={{ position: "relative", top: 4 }} />
          </StyledParagraph>
        </>
      )}
    </>
  ) : (
    <>
      <StyledHeader>Please login to see your liked recipes</StyledHeader>
    </>
  );
};

export default Likes;
