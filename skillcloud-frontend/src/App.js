import { Routes, Route } from "react-router-dom";

import { AuthContextProvider } from "./context/AuthContext";

import Login from "./components/Auth/Login";
import CreateAccount from "./components/Auth/CreateAccount";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Logout from "./components/Auth/Logout";

import Home from "./webpages/Home";

import Profile from "./webpages/Profile/Profile";
import EditProfile from "./webpages/Profile/EditProfile";

import Project from "./webpages/Project/Project";
import CreateProject from "./webpages/Project/CreateProject";
import EditProject from "./webpages/Project/EditProject";
import ApplyForm from "./webpages/Project/ApplyForm";

import Inbox from "./webpages/Inbox/Inbox";
import MsgDefault from "./webpages/Inbox/MsgDefault";
import MsgInvite from "./webpages/Inbox/MsgInvite";
import MsgResponse from "./webpages/Inbox/MsgResponse";
import MsgNoUsers from "./webpages/Inbox/MsgNoUsers";
import CompleteRequest from "./webpages/Inbox/CompleteRequest";
import MsgApply from "./webpages/Inbox/MsgApply";
import MsgApplyResponse from "./webpages/Inbox/MsgApplyResponse";

import Contacts from "./webpages/Chat/Contacts";
import Chat from "./webpages/Chat/Chat";

import BasicInfo from "./webpages/CreateProfile/BasicInfo";
import MoreDetails from "./webpages/CreateProfile/MoreDetails";
import AcceptDetails from "./webpages/CreateProfile/AcceptDetails";

import "./index.css";

function App() {
  return (
      <AuthContextProvider>
        <Routes>
        {/* Public Routes */}
          <Route path="/" element={<Login/>} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/basicinfo" element={<BasicInfo />} />
          <Route path="/moredetails" element={<MoreDetails />} />
          <Route path="/acceptdetails" element={<AcceptDetails />} />

          {/* Protected Routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile/:email" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/editprofile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />

          <Route path="/project/:id" element={<ProtectedRoute><Project /></ProtectedRoute>} />
          <Route path="/createproject" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
          <Route path="/editproject" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
          <Route path="/applyform" element={<ProtectedRoute><ApplyForm /></ProtectedRoute>} />

          <Route path="/inbox" element={<ProtectedRoute><Inbox /></ProtectedRoute>} />
          <Route path="/msg" element={<ProtectedRoute><MsgDefault /></ProtectedRoute>} />
          <Route path="/msginvite" element={<ProtectedRoute><MsgInvite /></ProtectedRoute>} />
          <Route path="/msgresponse" element={<ProtectedRoute><MsgResponse /></ProtectedRoute>} />
          <Route path="/msgnousers" element={<ProtectedRoute><MsgNoUsers /></ProtectedRoute>} />
          <Route path="/msgapplication" element={<ProtectedRoute><MsgApply /></ProtectedRoute>} />
          <Route path="/completerequest" element={<ProtectedRoute><CompleteRequest /></ProtectedRoute>} />
          <Route path="/msgapply" element={<ProtectedRoute><MsgApply /></ProtectedRoute>} />
          <Route path="/msgapplyresponse" element={<ProtectedRoute><MsgApplyResponse /></ProtectedRoute>} />

          <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
          <Route path="/chat/:senderid/:recieverid" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      </Routes>
    </AuthContextProvider>
  );
}
export default App