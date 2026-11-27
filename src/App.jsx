import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProgressPage from "./pages/ProgressPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import InterviewRoomPage from "./pages/InterviewRoomPage";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [selectedRole, setSelectedRole] = useState("Python & FastAPI Developer");
  const [user, setUser] = useState(null);

  const handleStartInterview = (role) => {
    setSelectedRole(role);
    setActivePage("interview");
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setActivePage("progress");
  };

  const handleLogout = () => {
    setUser(null);
    setActivePage("home");
  };

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage onStartInterview={handleStartInterview} />;
      case "progress":
        return <ProgressPage onStartInterview={handleStartInterview} />;
      case "about":
        return <AboutPage onStartInterview={handleStartInterview} />;
      case "contact":
        return <ContactPage />;
      case "auth":
        return <AuthPage onAuthSuccess={handleAuthSuccess} />;
      case "interview":
        return (
          <InterviewRoomPage
            role={selectedRole}
            onExit={() => setActivePage("home")}
            onViewProgress={() => setActivePage("progress")}
          />
        );
      case "404":
      default:
        return <NotFoundPage onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navbar
        activePage={activePage}
        onNavigate={setActivePage}
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-1">{renderPage()}</main>

      <Footer onNavigate={setActivePage} />
    </div>
  );
}