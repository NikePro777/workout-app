import React from "react";
// import Layout from "./components/common/Layout.jsx";
import Home from "./components/pages/Home/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import NewWorkout from "./components/pages/NewWorkout/NewWorkout";
import Auth from "./components/pages/Auth/Auth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="">
      <Route index element={<Home />} />
      <Route path="/new-workout" element={<NewWorkout />} />
      <Route path="/auth" element={<Auth />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
