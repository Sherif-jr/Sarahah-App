import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./Views/Home";
import Login from "./Views/Auth/Login";
import Register from "./Views/Auth/Register";
import ProtectedRoute, { GuestRoute } from "./components/ProtectedRoute";
import MessagesPage from "./Views/Messages/MessagesPage";
import SendMessage from "./Views/Messages/SendMessagePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <GuestRoute>
            <Home />
          </GuestRoute>
        ),
      },
      {
        path: "auth/login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "auth/register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: "messages/my-messages",
        element: (
          <ProtectedRoute>
            <QueryClientProvider client={queryClient}>
              <MessagesPage />
            </QueryClientProvider>
          </ProtectedRoute>
        ),
      },
      {
        path: "messages/send/:id",
        element: <SendMessage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
