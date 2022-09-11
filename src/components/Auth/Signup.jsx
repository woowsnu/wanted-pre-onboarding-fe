import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../apis/authInstance";
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

  const emailInputHandler = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    if (email.includes("@") && email.trim() !== "") {
      setIsEmailValid(true);
    }
  };

  const passwordInputHandler = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);
    if (enteredPassword.length > 7 && enteredPassword.trim() !== "") {
      setPasswordValid(true);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      await instance.post("/signup", JSON.stringify(user));
    } catch (error) {
      console.log(error.message);
    }
    alert(
      "회원가입이 완료되었습니다. 확인 클릭 시 로그인 페이지로 이동합니다."
    );
    navigate("/");
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
            <Button variant="contained" size="large" disabled>
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
`;
