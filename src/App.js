import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import TodoList from "./components/Todo/TodoList";
import AuthRoute from "./utils/AuthRoute";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/todo" element={<TodoList />} />
          </Route>
          <Route path="*" element={<div>존재하지 않는 페이지 입니다.</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
