import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProgressPage from "./pages/ProgressPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import InterviewRoomPage from "./pages/InterviewRoomPage";

export default function App() {
  const navigate = useNavigate();

  // Persist user across page reloads
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("interviewprep_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedRole, setSelectedRole] = useState("Python & FastAPI Developer");

  useEffect(() => {
    if (user) {
      localStorage.setItem("interviewprep_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("interviewprep_user");
    }
  }, [user]);

  const handleStartInterview = (role) => {
    setSelectedRole(role);
    navigate("/interview");
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    navigate("/profile");
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage onStartInterview={handleStartInterview} />} />
          <Route
            path="/progress"
            element={<ProgressPage onStartInterview={handleStartInterview} />}
          />
          <Route
            path="/about"
            element={<AboutPage onStartInterview={handleStartInterview} />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/profile" replace />
              ) : (
                <AuthPage onAuthSuccess={handleAuthSuccess} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              <ProfilePage
                user={user}
                onUpdateUser={setUser}
                onLogout={handleLogout}
                onStartInterview={handleStartInterview}
              />
            }
          />
          <Route
            path="/interview"
            element={
              <InterviewRoomPage
                role={selectedRole}
                onExit={() => navigate("/")}
                onViewProgress={() => navigate("/progress")}
              />
            }
          />
          {/* Catch-all 404 route */}
          <Route path="*" element={<NotFoundPage onNavigate={(path) => navigate(path === "home" ? "/" : `/${path}`)} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}