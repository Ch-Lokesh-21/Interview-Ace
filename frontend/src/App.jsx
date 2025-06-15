import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import Dashboard from "./pages/Home/Dashboard";
import UserProvider from "./context/userContext";
import CreateSessionForm from "./pages/Home/CreateSessionForm";

function App() {
  return (
    <UserProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/interview-prep/:sessionId"
              element={<InterviewPrep />}
            />
            <Route path="/createSession" element={<CreateSessionForm/>}/>
            <Route path="*" element={<h1>No Route Found</h1>} />
          </Routes>
        </BrowserRouter>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "0.9rem",
            },
          }}
        />
      </div>
    </UserProvider>
  );
}

export default App;
