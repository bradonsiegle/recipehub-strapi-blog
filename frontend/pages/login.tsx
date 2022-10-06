import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

import { RootState, AppDispatch } from "@/store";
import { selectUser, login } from "@/services/userSlice";

import { CenteredTile } from "@/components/Tile";
import { Input, ConditionalFeedback } from "@/components/Input";
import { Button } from "@/components/Button";
import { StyledLink } from "@/components/StyledLink";

const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`;

const StyledHeader = styled.h3`
  text-align: center;
  margin-bottom: 2rem;
  color: red;
`;

const StyledRegisterLink = styled.h3`
  text-align: center;
  margin: 2rem 0;
`;

export type LoginForm = {
  identifier: string;
  password: string;
};

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const router = useRouter();

  const { jwt, error } = useSelector<RootState, RootState["user"]>(selectUser);

  const dispatch = useDispatch<AppDispatch>();

  if (Boolean(jwt) && !error) {
    router.push("/user");
  }

  const onSubmit = (data: LoginForm) => {
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenteredTile header="Login" maxWidth="20vw">
        {error?.message && <StyledHeader>{error.message}</StyledHeader>}
        <StyledInput
          label="Identifier"
          placeholder="Username or Email"
          feedback={
            <ConditionalFeedback>
              {errors.identifier?.message}
            </ConditionalFeedback>
          }
          {...register("identifier", {
            required: "Please enter your username or email",
            minLength: {
              value: 6,
              message: "Username or email must be at least 6 characters",
            },
          })}
          height={8}
        ></StyledInput>
        <StyledInput
          label="Password"
          type="password"
          placeholder="Password"
          role="textbox"
          feedback={
            <ConditionalFeedback>
              {errors.password?.message}
            </ConditionalFeedback>
          }
          {...register("password", {
            required: "Please enter your password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          height={8}
        ></StyledInput>
        <Button type="submit">Sign In</Button>
        <StyledRegisterLink>
          <Link href="/registration" passHref>
            <StyledLink underline>Create Account</StyledLink>
          </Link>
        </StyledRegisterLink>
      </CenteredTile>
    </form>
  );
};

export default Login;
