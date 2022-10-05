import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { CenteredTile } from "@/components/Tile";
import { Button } from "@/components/Button";
import { selectUser, logout } from "@/services/userSlice";

import { FaRegSmileBeam } from "react-icons/fa";
import styled from "@emotion/styled";

const User: NextPage = () => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const { username, email, error } = useSelector<RootState, RootState["user"]>(
    selectUser
  );

  const StyledHeader = styled.h2`
    font-family: "Playfair Display", serif;
    text-align: center;
    margin-bottom: 10vmin;
    @media (min-width: 768px) {
      margin-top: 4rem;
    }
  `;

  useEffect(() => {
    if (!username || Boolean(error)) {
      dispatch(logout());
      router.push("/login");
    }
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    router.push("/");
  };

  return username && email ? (
    <>
      <StyledHeader>
        Bon Appétit, {username}{" "}
        <FaRegSmileBeam
          size={22}
          style={{ position: "relative", top: "3px" }}
        />
      </StyledHeader>
      <hr style={{ marginBottom: "2rem" }} className="responsive" />

      <CenteredTile header="Your Profile" maxWidth={"20vw"}>
        <h3>Username: {username}</h3>
        <h3>Email: {email}</h3>
        <Button onClick={logoutHandler} style={{ margin: "2rem 0" }}>
          Logout
        </Button>
      </CenteredTile>
    </>
  ) : null;
};

export default User;
