import React, { useState } from "react";
import { createTodoAPI } from "../../apis/todo";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AddTodo = (props) => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");

  const todoChangeHandler = (e) => {
    setTodo(e.target.value);
  };

  const addTodo = () => {
    const data = {
      todo,
    };
    createTodoAPI(data).then((response) => {
      if(response.ok) {
        props.renderTodos();
      }
    }).catch(error=>{console.error(error)});    
    setTodo("");
    navigate("/todo")
  };


  return (
    <Container>
      <TextField
        fullWidth
        value={todo}
        onChange={todoChangeHandler}
        variant="standard"
        placeholder=" 할 일을 입력하세요."
      />
      <IconButton onClick={addTodo} color="primary" >
        <AddCircleIcon />
      </IconButton>
    </Container>
  );
};

export default AddTodo;

const Container = styled.div`
width: 30%;
margin: 0 auto;
padding: 1rem;
display: flex;
justify-content: center;
border-radius: 5px;
background-color: #fff;
box-shadow: 3px 3px 3px #d9d9db;

@media screen and (max-width: 768px) {
  width: 80%;
`;
