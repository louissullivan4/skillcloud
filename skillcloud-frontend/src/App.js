import { Routes, Route } from "react-router-dom";

import LoginForm from "./components/Auth/LoginForm";
// import Logout from "./components/Auth/Logout";

import Layout from "./components/Layout";

import Home from "./webpages/Home";

import Profile from "./webpages/Profile/Profile";

import Project from "./webpages/Project/Project";
import CreateProject from "./webpages/Project/CreateProject";

import "./index.css";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              {/* Public */}
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/project/:id" element={<Project />} />
                <Route path="/createproject" element={<CreateProject />} />
                {/* <Route path="/logout" element={<Logout />} /> */}
          </Route>
      </Routes>
  );
}
export default App