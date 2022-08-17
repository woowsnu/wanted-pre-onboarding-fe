import React, { useState } from "react";
import { updateTodoAPI, deleteTodoAPI } from "../apis/todo";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckIcon from "@mui/icons-material/Check";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import styled from "styled-components";

const TodoItem = (props) => {
  const [todo, setTodo] = useState(props.todo);
  const [isCompleted, setIsCompleted] = useState(props.isCompleted);
  const [editMode, setEditMode] = useState(false);

  const isComplatedHandler = () => {
    setIsCompleted(!isCompleted);
  };

  const todoChangeHandler = (e) => {
    setTodo(e.target.value);
  };

  const editModeHandler = () => {
    setEditMode(!editMode);
  };

  const updateTodo = () => {
    const newTodo = {
      todo,
      isCompleted,
    };
    updateTodoAPI(newTodo, props.id).then((responese) => {
      if (responese.ok) {
        setEditMode(false);
      }
    });
  };

  const deleteTodo = () => {
    deleteTodoAPI(props.id).then((response)=>{
      if(response.ok) {
        props.renderTodos();
      }
    })
  };

  return (
    <Container>
      {!editMode ? (
        <Li>
          <Checkbox
            color="default"
            onChange={isComplatedHandler}
            value={isCompleted}
          />
          <p className="todo">{todo}</p>
          <div className="btns">
            <IconButton onClick={editModeHandler}>
              <EditRoundedIcon />
            </IconButton>
            <IconButton onClick={deleteTodo}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Li>
      ) : (
        <Li>
          <Checkbox
            color="default"
            onChange={isComplatedHandler}
            value={isCompleted}
          />
          <TextField
            className="editTodo"
            fullWidth
            value={todo}
            onChange={todoChangeHandler}
            variant="standard"
          />
          <div className="btns">
            <IconButton size="small" onClick={updateTodo}>
              <CheckIcon />
            </IconButton>
            <IconButton size="small" onClick={editModeHandler}>
              <CloseRoundedIcon />
            </IconButton>
          </div>
        </Li>
      )}
    </Container>
  );
};

export default TodoItem;

const Container = styled.div`
  width: 100%;
`;

const Li = styled.div`
  padding: 0.2rem 1rem;
  display: flex;
  height: 4rem;
  justify-content: space-between;
  align-items: center;

  .todo {
    padding: 0;
    word-break: ;
  }

  .editTodo {
    max-width: 70%;
    virtical-align: center;
  }

  .btns {
    margin: auto 0;
  }
`;
