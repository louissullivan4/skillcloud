import { Routes, Route } from "react-router-dom";

import Home from "./webpages/Home";
import Profile from "./webpages/Profile";
import LoginForm from "./components/LoginForm";

// import "./styles.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loginform" element={<LoginForm />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}