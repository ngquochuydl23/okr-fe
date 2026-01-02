import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./styles/App.scss";
import Layout from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleBasedRoute } from "./components/RoleBasedRoute";
import { ChatbotProvider } from "./contexts/ChatbotContext";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import Dashboard from "./pages/Dashboard";
import Objectives from "./pages/Objectives/Objectives";
import KeyResults from "./pages/KeyResults";
import Teams from "./pages/Teams";
import Settings from "./pages/Settings";
import AdminPanel from "./pages/AdminPanel";
import { LoadingContextProvider } from "./contexts/LoadingContextProvider";

const router = createBrowserRouter([
  // Public routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "objectives",
        element: <Objectives />,
      },
      {
        path: "key-results",
        element: <KeyResults />,
      },
      {
        path: "teams",
        element: (
          <RoleBasedRoute allowedRoles={["manager", "admin"]}>
            <Teams />
          </RoleBasedRoute>
        ),
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "admin",
        element: (
          <RoleBasedRoute allowedRoles={["admin"]}>
            <AdminPanel />
          </RoleBasedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

function App() {
  return (
    <LoadingContextProvider>
      <ChatbotProvider>
        <RouterProvider router={router} />
      </ChatbotProvider>
    </LoadingContextProvider>
  );
}

export default App;
