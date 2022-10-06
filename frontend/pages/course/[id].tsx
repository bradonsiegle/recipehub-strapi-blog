import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";
import MarkdownIt from "markdown-it";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  PinterestShareButton,
  WhatsappShareButton,
  RedditShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  PinterestIcon,
  WhatsappIcon,
  RedditIcon,
} from "react-share";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { RootState, AppDispatch } from "@/store";
import { actions, logout } from "@/services/userSlice";
import { useRouter } from "next/router";

import { Course as CourseType, Response } from "@/types";
import { CenteredTile } from "@/components/Tile";
import { StyledLink } from "@/components/StyledLink";
import { LikeButton } from "@/components/IconButton/LikeButton";
import { ShareButton } from "@/components/IconButton/ShareButton";

const ImageContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  width: 100%;
  height: 90vw;
  @media (min-width: 768px) {
    width: 500px;
    height: 360px;
  }
`;

const CustomLink = styled(StyledLink)`
  text-decoration: underline;
`;

const StyledParagraph = styled.p`
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
  opacity: 0.8;
  max-width: 420px;
`;

const StyledContent = styled.div`
  max-width: width;
  margin-top: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;

  @media (min-width: 768px) {
    max-width: 420px;
  }
`;

const IconsDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: -1.2rem;
`;

const ShareDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
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
        id: data.id,
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

  const [isClicked, setIsClicked] = useState(false);

  const { courses, username, email } = useSelector<
    RootState,
    RootState["user"]
  >((state) => state.user);

  const checkForCourse = (id: number) => {
    return courses.find((course?) => course?.id === id);
  };

  const thisCourseUrl = `https://therecipehub.vercel.app/course/${course?.id}`;

  if (course && course?.attributes && course?.id) {
    const id = course?.id;
    const {
      attributes: {
        header,
        subtitle,
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
          <title>{header}</title>
          <meta name="description" content={header} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CenteredTile header={header}>
          <ImageContainer>
            <Image
              alt={`Cover for ${header}`}
              src={`${strapi_url}${url}`}
              width={width}
              height={height}
              objectFit="cover"
              style={{ borderRadius: "1rem" }}
            />
            {/* <img
							src={`${strapi_url}${url}`}
							alt={`Cover for ${header}`}
							width={width}
							height={height}
							style={{ borderRadius: '1rem', objectFit: 'cover' }}
						/> */}
          </ImageContainer>

          <IconsDiv>
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
            <ShareButton
              name="Home"
              size={1}
              isClicked={isClicked}
              onClick={() => {
                setIsClicked(!isClicked);
              }}
            />
          </IconsDiv>

          {isClicked && (
            <ShareDiv>
              <FacebookShareButton
                quote="Look at this recipe!"
                url={thisCourseUrl}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton
                title="Look at this recipe!"
                url={thisCourseUrl}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <PinterestShareButton
                description="Look at this recipe!"
                url={thisCourseUrl}
                media={`${url}`}
              >
                <PinterestIcon size={32} round />
              </PinterestShareButton>
              <WhatsappShareButton title={header} url={thisCourseUrl}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <RedditShareButton title={header} url={thisCourseUrl}>
                <RedditIcon size={32} round />
              </RedditShareButton>
              <EmailShareButton
                subject={header}
                body={`Check out this ${header} recipe!`}
                url={thisCourseUrl}
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
            </ShareDiv>
          )}
          <StyledParagraph>{subtitle}</StyledParagraph>

          <StyledContent dangerouslySetInnerHTML={{ __html: description }} />
          <h4>Posted: {new Date(publishedAt).toDateString()}</h4>
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
