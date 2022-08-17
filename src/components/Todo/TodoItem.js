import React, { useState } from "react";
import { updateTodoAPI, deleteTodoAPI } from "../../apis/todo";
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
  const [editedTodo, setEditedTodo] = useState(props.todo);
  const [isCompleted, setIsCompleted] = useState(props.isCompleted);
  const [editMode, setEditMode] = useState(false);

  const todoChangeHandler = (e) => {
    setEditedTodo(e.target.value);
  };

  const updateIsComplated = () => {
    
    const newTodo = {
      todo: todo,
      isCompleted: !isCompleted,
    };
    updateTodoAPI(newTodo, props.id).then((responese) => {
      if (responese.ok) {
        setIsCompleted(!isCompleted)
      }
    });
  }    
   

  const editModeHandler = () => {
    setEditMode(!editMode);
    if (todo !== editedTodo) {
      setEditedTodo(todo);
    }
  };

  const updateTodoAndComplate = () => {
    const newTodo = {
      todo: editedTodo,
      isCompleted
    };
    updateTodoAPI(newTodo, props.id).then((responese) => {
      if (responese.ok) {
        setEditMode(false);
        setTodo(editedTodo);
      }
    });
  };

  const deleteTodo = () => {
    deleteTodoAPI(props.id).then((response) => {
      if (response.ok) {
        props.renderTodos();
      }
    });
  };

  const doneTodo = isCompleted ? "doneTodo" : "todo";

  return (
    <Container>
      {!editMode ? (
        <Li>
          <Checkbox
            checked={isCompleted}
            color="default"
            onChange={updateIsComplated}
            value={isCompleted}
          />
          <p className={doneTodo}>{todo}</p>
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
            checked={isCompleted}
            color="default"
          />
          <TextField
            className="editTodo"
            fullWidth
            value={editedTodo}
            onChange={todoChangeHandler}
            variant="standard"
          />
          <div className="btns">
            <IconButton size="small" onClick={updateTodoAndComplate}>
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
    word-break: break-all;
  }

  .doneTodo {
    color: #d9d9db;
    text-decoration: line-through;
  }

  .editTodo {
    max-width: 70%;
    virtical-align: center;
  }

  .btns {
    margin: auto 0;
  }
`;
