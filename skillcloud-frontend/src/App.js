import { Routes, Route } from "react-router-dom";

import Home from "./webpages/Home";
import Profile from "./webpages/Profile";
import Project from "./webpages/Project";

import LoginForm from "./components/LoginForm";
import ProtectedRoutes from './components/ProtectedRoutes';

import "./index.css";

export default function App() {
  return (
    <Routes>
      {/* <Route element={<ProtectedRoutes />}> */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/project/:id" element={<Project />} />
      {/* </Route> */}
      <Route path="/loginform" element={<LoginForm />} />
    </Routes>
  );
}