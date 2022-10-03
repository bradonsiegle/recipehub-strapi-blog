import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import MarkdownIt from "markdown-it";
import { LikeButton } from "@/components/IconButton/LikeButton";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { actions, logout } from "@/services/userSlice";
import { useRouter } from "next/router";

import { Course as CourseType, Response } from "@/types";
import { CenteredTile } from "@/components/Tile";
import { StyledLink } from "@/components/StyledLink";

const ImageContainer = styled.div<{ maxWidth: string }>`
  display: flex;
  margin-bottom: 2rem;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  height: 50vw;
  @media (min-width: 768px) {
    height: 20vw;
  }
`;

const CustomLink = styled(StyledLink)`
  text-decoration: underline;
`;

type CourseResponse = Response<CourseType>;
type CoursesResponse = Response<CourseType[]>;

export const getStaticPaths: GetStaticPaths = async () => {
  const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  const res = await fetch(`${api_url}/courses?populate=*`, {
    method: "GET",
  });

  const response: CoursesResponse = await res.json();

  const status = response?.error?.status;

  if (status && (status < 200 || status >= 300)) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const paths = response.data.map(({ id }) => `/course/${id}`);

  return {
    paths,
    fallback: true,
  };
};

const likeAction = (id: number) => {
  console.log(`Like action for course`);
};

export const getStaticProps: GetStaticProps = async (context) => {
  const api_url = process.env.NEXT_PUBLIC_STRAPI_API_URL;

  const id = context?.params?.id;

  const res = await fetch(`${api_url}/courses/${id}?populate=*`, {
    method: "GET",
  });

  const { error, data, meta }: CourseResponse = await res.json();

  if (error && (error?.status < 200 || error?.status >= 300)) {
    return {
      props: {
        course: {},
        meta: {},
      },
    };
  }

  const md = new MarkdownIt();

  return {
    props: {
      course: {
        ...data,
        attributes: {
          ...data.attributes,
          description: md.render(data.attributes.description),
        },
      },
      meta: meta,
    },
  };
};

const strapi_url = process.env.NEXT_PUBLIC_STRAPI_URL;

const CoursePage: NextPage<{
  course: CourseType;
  meta: CourseResponse["meta"];
}> = ({ course }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { courses, username, email } = useSelector<
    RootState,
    RootState["user"]
  >((state) => state.user);

  const checkForCourse = (id: number) => {
    return courses.find((course) => course.id === id);
  };

  if (course && course?.attributes) {
    const {
      id,
      attributes: {
        header,
        link,
        description,
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
    } = course;

    return (
      <>
        <Head>
          <title>Course: {header}</title>
          <meta name="description" content={header} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CenteredTile header={header}>
          <ImageContainer maxWidth={`${width}px`}>
            <Image
              alt={`Cover for ${header}`}
              src={`${strapi_url}${url}`}
              width={width}
              height={height}
              // layout="fill"
              objectFit="cover"
            />
          </ImageContainer>

          <div>
            <LikeButton
              name="BiBookmarkHeart"
              size={1}
              isLiked={checkForCourse(id) ? true : false}
              onClick={() => {
                //check if user is logged in
                if (!username || !email) {
                  dispatch(logout());
                  router.push("/login");
                } else {
                  const likePayload = {
                    id,
                    course,
                  };
                  if (checkForCourse(id)) {
                    dispatch(actions.unlike(likePayload.id));
                  } else {
                    dispatch(actions.like(likePayload));
                  }
                }
              }}
            />
          </div>

          <div
            style={{ maxWidth: width, marginTop: "1rem" }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <h4>{new Date(publishedAt).toDateString()}</h4>
          <Link href={link} passHref>
            <CustomLink>Original Recipe</CustomLink>
          </Link>
        </CenteredTile>
      </>
    );
  }
  return null;
};

export default CoursePage;
