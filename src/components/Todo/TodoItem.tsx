import React, { useState } from "react";
import { instance } from "../../apis/todoInstance";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckIcon from "@mui/icons-material/Check";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface IProps {
  id: number;
  isCompleted: boolean;
  todo: string[];
  renderTodos: any;
}

const TodoItem = ({id, isCompleted, todo, renderTodos} : IProps) => {
  const [todoItem, setTodoItem] = useState(todo);
  const [editedTodo, setEditedTodo] = useState(todo);
  const [isCompletedItem, setIsCompletedItem] = useState(isCompleted);
  const [editMode, setEditMode] = useState(false);

  const todoChangeHandler = (e) => {
    setEditedTodo(e.target.value);
  };

  // 수정모드 on/off
  const editModeHandler = () => {
    setEditMode(!editMode);
    if (todoItem !== editedTodo) {
      setEditedTodo(todoItem);
    }
  };

  // isCompleted(checkbox) 변경
  const updateIsComplated = async () => {
    const newTodo = {
      todo: todoItem,
      isCompleted: !isCompletedItem,
    };
    try {
      await instance.put(`/${id}`, JSON.stringify(newTodo));
      setIsCompletedItem(!isCompletedItem);
    } catch (error) {
      console.log(error);
    }
  };

  // 수정된 todo 업데이트
  const updateEditedTodo = async () => {
    const newTodo = {
      todo: editedTodo,
      isCompleted,
    };
    try {
      await instance.put(`/${id}`, JSON.stringify(newTodo));
      setEditMode(false);
      setTodoItem(editedTodo);
    } catch (error) {
      console.log(error);
    }
  };

  // todo 삭제
  const deleteTodo = async () => {
    try {
      await instance.delete(`${id}`);
      renderTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const doneTodo = isCompleted ? "doneTodo" : "todo";

  return (
    <Container>
      {!editMode ? (
        <Li>
          <Checkbox
            checked={isCompletedItem}
            color="default"
            onChange={updateIsComplated}
            value={isCompletedItem}
          />
          <p className={doneTodo}>{todoItem}</p>
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
          <Checkbox checked={isCompletedItem} color="default" />
          <TextField
            className="editTodo"
            fullWidth
            value={editedTodo}
            onChange={todoChangeHandler}
            variant="standard"
          />
          <div className="btns">
            <IconButton size="small" onClick={updateEditedTodo}>
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
