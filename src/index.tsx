import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Users from "./UserComponent/Users";
import Exercises from "./ExercisesComponent/Exercises";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import UserLogin from "./UserNotLoggedComponent/Login";
import { UsersApi } from "./rest-api-client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Users />,
  },
  {
    path: "/:userId",
    element: <Users />,
  },
  {
    path: "/login",
    loader: () => UsersApi.findAll(),
    element: <UserLogin />,
  },
  {
    path: "/exercises/:userId",
    element: <Exercises />,
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
