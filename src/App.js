import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodoList from "./components/TodoList";

function App() {
  // const user_token = !!localStorage.getItem("access_token");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<div>존재하지 않는 페이지 입니다.</div>} />
      </Routes>
    </div>
  );
}

export default App;
