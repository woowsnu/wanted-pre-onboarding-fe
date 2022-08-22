import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllTodoAPI } from "../../apis/todo";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import styled from "styled-components";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

const TodoList = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const token = !!localStorage.getItem("access_token");
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:8000/todos", {
        headers: {
          "Authorization": "Bearer " + token,
        },
      })
      console.log(response.data)
      setTodos(response.data)
        // const responseData = await response.json();
      } catch(err) {
        console.log(err)
      }
    };

    fetchTodo();
  }, []);

  const renderTodos = async () => {
    await getAllTodoAPI()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos(data);
      });
  };

  const deleteToken = () => {
    localStorage.removeItem("access_token");
    alert("로그아웃 되었습니다.");
    navigate("/", { replace: true });
  };

  return (
    <Container>
      <Button
        className="logout"
        variant="contained"
        startIcon={<LogoutIcon />}
        onClick={deleteToken}
      >
        Logout
      </Button>
      <h1 className="title">Todo List</h1>
      <AddTodo renderTodos={renderTodos} />
      <Wrapper>
        <Ul>
          {todos.length > 0 &&
            todos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  todo={todo.todo}
                  isCompleted={todo.isCompleted}
                  renderTodos={renderTodos}
                />
              );
            })}
          {todos.length === 0 && <Caption>할 일을 등록해보세요!</Caption>}
        </Ul>
      </Wrapper>
    </Container>
  );
};

export default TodoList;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f2f2f2;
  .logout {
    float: right;
    margin-top: 1rem;
    margin-right: 1rem;
  }
  .title {
    text-align: center;
    padding-top: 8rem;
    padding-bottom: 2rem;
  }
`;

const Wrapper = styled.div`
  width: 30%;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 3px 3px 3px #d9d9db;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 80%;
`;

const Ul = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const Caption = styled.div`
  text-align: center;
  padding: 1rem;
`;
