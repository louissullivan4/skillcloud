import { Routes, Route } from "react-router-dom";

import { AuthContextProvider } from "./context/AuthContext";

import Login from "./components/Auth/Login";
import CreateAccount from "./components/Auth/CreateAccount";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

import Home from "./webpages/Home";

import Profile from "./webpages/Profile/Profile";

import Project from "./webpages/Project/Project";
import CreateProject from "./webpages/Project/CreateProject";

import Inbox from "./webpages/Inbox/Inbox";
import MsgDefault from "./webpages/Inbox/MsgDefault";
import MsgInvite from "./webpages/Inbox/MsgInvite";
import MsgResponse from "./webpages/Inbox/MsgResponse";
import MsgNoUsers from "./webpages/Inbox/MsgNoUsers";
import CompleteRequest from "./webpages/Inbox/CompleteRequest";


import "./index.css";

function App() {
  return (
      <AuthContextProvider>
        <Routes>
        {/* Public Routes */}
          <Route path="/" element={<Login/>} />
          <Route path="/createaccount" element={<CreateAccount />} />

          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          <Route path="/project/:id" element={<ProtectedRoute><Project /></ProtectedRoute>} />
          <Route path="/createproject" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />

          <Route path="/inbox" element={<ProtectedRoute><Inbox /></ProtectedRoute>} />
          <Route path="/msg" element={<ProtectedRoute><MsgDefault /></ProtectedRoute>} />
          <Route path="/msginvite" element={<ProtectedRoute><MsgInvite /></ProtectedRoute>} />
          <Route path="/msgresponse" element={<ProtectedRoute><MsgResponse /></ProtectedRoute>} />
          <Route path="/msgnousers" element={<ProtectedRoute><MsgNoUsers /></ProtectedRoute>} />
          <Route path="/completerequest" element={<ProtectedRoute><CompleteRequest /></ProtectedRoute>} />
      </Routes>
    </AuthContextProvider>
  );
}
export default App