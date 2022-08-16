import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupAPI } from "../apis/auth";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);

  const checkEmailValid = () => {
    if (email.includes("@") && email.trim() !== "") {
      setIsEmailValid(true);
    }
  };

  const checkPasswordValid = () => {
    if (password.length > 7 && password.trim() !== "") {
      setPasswordValid(true);
    }
  };

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
    checkEmailValid();
    console.log(isEmailValid);
  };
  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
    checkPasswordValid(isPasswordValid);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    await signupAPI(user).then((response) => {
      if (response.ok) {
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      }
    });
    await navigate("/");
  };

  return (
    <Container>
      <h1>회원가입</h1>
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
          {isEmailValid && isPasswordValid ? (
            <Button
              type="submit"
              className="btn-text"
              variant="contained"
              size="large"
            >
              가입하기
            </Button>
          ) : (
            <Button
              className="btntext"
              variant="contained"
              size="large"
              disabled
            >
              가입하기
            </Button>
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  width: 30%;
  text-align: center;
  margin: 0 auto;
  padding-top: 10rem;
  @media screen and (max-width: 768px) {
    width: 80%;
  }

  .btntext {
    font-size: 1.2rem;
  }
`;
