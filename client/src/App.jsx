import { useState } from "react";
import "./App.module.css";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
// import EditAllGroupTask from "./pages/editAllGroupTask/EditAllGroupTask";
import AllTasks from "./pages/allTasks/AllTasks";
import EditTask from "./pages/editTask/EditTask";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
// import Dashboard from "./pages/dashboard/Dashboard";
import CreateTask from "./pages/createTask/CreateTask";
// import CreateCat from "./pages/createCategories/CreateCat";

// This is how to use env variables in vite
export const URL = import.meta.env.VITE_SERVER_URL;

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />

          {user ? (
            <>
              {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
              <Route path="/createTask" element={<CreateTask />} />
              {/* <Route path="/createCat" element={<CreateCat />} /> */}
              <Route path="/AllTasks" element={<AllTasks />} />
            </>
          ) : (
            <>
              {/* <Route path="/Dashboard" element={<Navigate to="/login" />} /> */}
              <Route path="/createTask" element={<Navigate to="/login" />} />
              {/* <Route path="/createCat" element={<Navigate to="/login" />} /> */}
              <Route path="/AllTasks" element={<Navigate to="/login" />} />
            </>
          )}

          {/* Public Routes */}

          <Route path="/editTask/:taskId" element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
