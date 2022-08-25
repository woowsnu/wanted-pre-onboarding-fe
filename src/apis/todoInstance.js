import axios from "axios";

const token = localStorage.getItem("access_token");

export const instance = axios.create({
  baseURL: "http://localhost:8000/todos",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
});
