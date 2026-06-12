import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import CustomerDashboard from "../pages/CustomerDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AgentDashboard from "../pages/AgentDashboard";
import Customers from "../pages/Customers";
import Agents from "../pages/Agents";
import TicketDetails from "../pages/TicketDetails";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
  path="/admin"
  element={
    <ProtectedRoute
      allowedRole="ADMIN"
    >
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/agent"
  element={
    <ProtectedRoute
      allowedRole="AGENT"
    >
      <AgentDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/customer"
  element={
    <ProtectedRoute
      allowedRole="CUSTOMER"
    >
      <CustomerDashboard />
    </ProtectedRoute>
  }
/>
  <Route
  path="/customers"
  element={
    <ProtectedRoute
      allowedRole="ADMIN"
    >
      <Customers />
    </ProtectedRoute>
  }
/>

<Route
  path="/agents"
  element={
    <ProtectedRoute
      allowedRole="ADMIN"
    >
      <Agents />
    </ProtectedRoute>
  }
/>

<Route
  path="/tickets/:id"
  element={
    <ProtectedRoute>
      <TicketDetails />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default AppRoutes;