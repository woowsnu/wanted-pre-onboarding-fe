import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginAPI } from "../apis/auth";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    loginAPI(user).then(async (response) => {
      if (response.ok) {
        const res = await response.json();
        localStorage.setItem("access_token", res.access_token);
      }
    });
    navigate("/todo");
  };

  return (
    <Container>
      <h1>로그인</h1>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={onSubmitHandler}
      >
        <Stack spacing={5}>
          <TextField
            id="standard-helperText"
            label="Email"
            placeholder="example@todo.com"
            variant="standard"
            onChange={emailInputHandler}
            value={email}
          />
          <TextField
            id="standard-helperText"
            type="password"
            label="password"
            placeholder="8자 이상 입력해주세요."
            variant="standard"
            onChange={passwordInputHandler}
            value={password}
          />
          <Button type="submit" variant="contained" size="large">
            로그인
          </Button>
          <Caption>
            <span className="text">계정이 없으신가요?</span>
            <span className="text">
              <Link to="/signup" style={{ textDecoration: "none", color: "blue" }}>
                회원가입
              </Link>
            </span>
          </Caption>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 30%;
  text-align: center;
  margin: 0 auto;
  padding-top: 10rem;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const Caption = styled.div`
  text-align: center;
  text-decoration: none;
  font-size: 1rem;

  .text {
    text-decoration: none;
    padding: 4px;
  }
`;
