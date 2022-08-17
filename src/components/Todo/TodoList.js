import React, { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import { getAllTodoAPI } from "../apis/todo";
import styled from "styled-components";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const renderTodos = () => {
    getAllTodoAPI()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos(data);
      });
  };

  useEffect(()=>{
    renderTodos();
  }, []);

  console.log(todos);

  return (
    <Container>
      <h1 className="title">Todo List</h1>
      <AddTodo renderTodos={renderTodos}/>
      <Wrapper>
        <Ul>
          {todos.length > 0 &&
            todos.map((item) => {
              return (
                <TodoItem
                  key={item.id}
                  id={item.id}
                  todo={item.todo}
                  isCompleted={item.isCompleted}
                  renderTodos={renderTodos}
                />
              );
            })}

          {/* <div>등록된 Todo가 없습니다.</div> */}
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
