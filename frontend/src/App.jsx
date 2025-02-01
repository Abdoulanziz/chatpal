import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import { useAuthStore } from "./stores/useAuthStore";
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./stores/useThemeStore";
const App = () => {

  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore()


  const {theme}=useThemeStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  if (isCheckingAuth && !authUser) {
    return <div className="flex items-center h-screen justify-center"><Loader className="size-10 animate-spin">This is checking Auth</Loader></div>
  } else {
    return (
      <>
        <div data-theme={theme} >
          <Navbar />
          <Routes>

            <Route path="/" index element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
            <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
            <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={'/'} />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/settings" element={authUser ? <SettingPage /> : <Navigate to={"/login"} />} />

          </Routes>
          <Toaster
            toastOptions={{
              success: {
                duration: 4000,
                style: {
                  background: "#28a745", // Replace with your chosen color
                  color: "#f9f9f9",      // Replace with your chosen color
                  borderRadius: "8px",
                  padding: "16px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                },
              },
            }}
          />
        </div>

      </>
    );
  }

};

export default App;
