import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Users from "./UserComponent/Users";
import Exercises from "./ExercisesComponent/Exercises";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UserLogin from "./UserNotLoggedComponent/Login";
import { UsersApi } from "./rest-api/rest-api-client";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Users />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:userId",
    element: <Users />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <UserLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/exercises/:userId",
    element: <Exercises />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
