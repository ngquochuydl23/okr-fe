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
import WorkspaceObjectives from "./pages/Objectives/Workspace";
import TeamObjectives from "./pages/Objectives/Team";
import PersonalObjectives from "./pages/Objectives/Personal";
import SupportingObjectives from "./pages/Objectives/Supporting";
import KeyResults from "./pages/KeyResults";
import Teams from "./pages/Teams";
import Settings from "./pages/Settings/Menu";
import Profile from "./pages/Settings/Profile";
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
        path: "objectives/workspace",
        element: <WorkspaceObjectives />,
      },
      {
        path: "objectives/team",
        element: <TeamObjectives />,
      },
      {
        path: "objectives/personal",
        element: <PersonalObjectives />,
      },
      {
        path: "objectives/supporting",
        element: <SupportingObjectives />,
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
        path: "settings/profile",
        element: <Profile />,
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
