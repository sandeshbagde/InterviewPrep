import { useState } from "react";
import { Flame, Mail, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AuthPage({ onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleGmailSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail.endsWith("@gmail.com")) {
      setError("Please enter a valid @gmail.com address or use Continue with Google.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const displayName = isRegister
      ? (/^[A-Za-z ]{4,}$/.test(name.trim()) ? name.trim() : null)
      : "";

    if (isRegister && !displayName) {
      setError("Please enter a valid name (minimum 4 letters, alphabets only).");
      return; }


    onAuthSuccess({
      name: displayName,
      email: trimmedEmail,
      provider: "gmail",
    });
  };

  const handleGoogleLogin = () => {
    setError("");
    // Ready to connect to @react-oauth/google + FastAPI backend in Phase 2
    onAuthSuccess({
      name: "Candidate (Google)",
      email: "candidate@gmail.com",
      provider: "google",
    });
  };

  return (
    <div className="flex min-h-[82vh] items-center justify-center px-6 py-12 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
            <Flame className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-bold">
            {isRegister ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            {isRegister
              ? "Register to save your mock interviews and track progress"
              : "Log in to access your dashboard and interview history"}
          </p>
        </div>

        {/* Continue with Google Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.3 0 6.08-1.09 8.1-2.96l-3.88-3.05c-1.1.74-2.51 1.18-4.22 1.18-3.24 0-5.99-2.19-6.97-5.13H1.02v3.14C3.05 21.2 7.24 24 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.03 14.04c-.25-.74-.39-1.54-.39-2.36 0-.82.14-1.62.39-2.36V6.18H1.02C.37 7.47 0 8.93 0 10.48s.37 3.01 1.02 4.3l4.01-3.14Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.79 0 3.41.62 4.68 1.82l3.51-3.51C18.07 1.19 15.3 0 12 0 7.24 0 3.05 2.8 1.02 6.82l4.01 3.14c.98-2.94 3.73-5.21 6.97-5.21Z"
            />
          </svg>
          {isRegister ? "Sign up with Google" : "Continue with Google"}
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-xs uppercase text-slate-500">or with Gmail</span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Gmail / Password Form */}
        <form onSubmit={handleGmailSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-slate-300">Full Name</label>
              <div className="relative mt-1">
                <User className="absolute top-3 left-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pr-4 pl-10 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300">Gmail Address</label>
            <div className="relative mt-1">
              <Mail className="absolute top-3 left-3.5 h-4 w-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@gmail.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pr-4 pl-10 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute top-3 left-3.5 h-4 w-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pr-10 pl-10 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-3 text-slate-500 hover:text-slate-300"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500"
          >
            {isRegister ? "Register with Gmail" : "Sign In with Gmail"}
          </button>
        </form>

        {/* Toggle Login / Register */}
        <p className="mt-6 text-center text-sm text-slate-400">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            className="font-semibold text-indigo-400 hover:underline"
          >
            {isRegister ? "Log in" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}