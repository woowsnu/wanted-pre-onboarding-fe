import baseURL from ".";

const token = localStorage.getItem("access_token")

// Todo 추가 Api
export const createTodoAPI = (todo) =>
  fetch(`${baseURL}/todos`, {
    method: "POST",
    headers: {
      "Authorization": 'Bearer ' + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

// 전체 리스트 조회 API
export const getAllTodoAPI = async () =>
  fetch(`${baseURL}/todos`, {
    headers: {
      "Authorization": 'Bearer ' + token,
    }
  });

// Todo 수정 API
export const updateTodoAPI = async (newTodo, id) =>
  fetch(`${baseURL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": 'Bearer ' + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

// Todo 삭제 API
export const deleteTodoAPI = async (id) =>
  fetch(`${baseURL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": 'Bearer ' + token,
      "Content-Type": "application/json",
    },
  });
