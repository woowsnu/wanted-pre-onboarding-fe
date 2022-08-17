import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import TodoList from "./components/Todo/TodoList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="*" element={<div>존재하지 않는 페이지 입니다.</div>} />
      </Routes>
    </div>
  );
}

export default App;
