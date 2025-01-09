import React from "react";
import { Route, Navigate } from "react-router-dom";
import Dashboard from "../../pages/dashboard/Dashboard"; // Import all necessary pages
import GroupCreateTask from "../../pages/groupCreateTask/GroupCreateTask";
import CreateTask from "../../pages/createTask/CreateTask";
import CreateCat from "../../pages/createCategories/CreateCat";
import AllGroupTasks from "../../pages/allGroupTasks/AllGroupTasks";
import AllTasks from "../../pages/allTasks/AllTasks";

const ProtectedRoutes = ({ user }) => {
  return (
    <>
      <Route
        path="/Dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/GroupCreateTask"
        element={user ? <GroupCreateTask /> : <Navigate to="/login" />}
      />
      <Route
        path="/CreateTask"
        element={user ? <CreateTask /> : <Navigate to="/login" />}
      />
      <Route
        path="/createCat"
        element={user ? <CreateCat /> : <Navigate to="/login" />}
      />
      <Route
        path="/allGroupTasks"
        element={user ? <AllGroupTasks /> : <Navigate to="/login" />}
      />
      <Route
        path="/AllTasks"
        element={user ? <AllTasks /> : <Navigate to="/login" />}
      />
    </>
  );
};

export default ProtectedRoutes;
