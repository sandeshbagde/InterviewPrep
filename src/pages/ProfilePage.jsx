import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  User,
  Mail,
  Briefcase,
  Award,
  CheckCircle2,
  LogOut,
  Save,
  ShieldCheck,
} from "lucide-react";

export default function ProfilePage({ user, onUpdateUser, onLogout }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const [name, setName] = useState(user.name || "");
  // const [targetRole, setTargetRole] = useState(
  //    "Python & FastAPI Developer"
  // );
  const [experience, setExperience] = useState(user.experience || "Fresher / 0-1 Years");
  const [skills, setSkills] = useState(
    user.skills || "Python, FastAPI, React.js, SQL, Tailwind CSS"
  );
  const [saved, setSaved] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: name.trim() || user.name,
      experience,
      skills,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 text-white">
      {/* Profile Header Card */}
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-slate-800 bg-slate-900 p-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-600 text-3xl font-extrabold text-white shadow-lg shadow-indigo-500/25">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified
              </span>
            </div>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
              <Mail className="h-4 w-4 text-slate-500" />
              {user.email}
            </p>
            <p className="mt-1 text-xs text-indigo-400">
              Signed in via {user.provider === "google" ? "Google OAuth" : "Gmail"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {/* <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-xs text-slate-400">Target Track</p>
          <p className="mt-1 text-base font-bold text-white">{targetRole}</p>
        </div> */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-xs text-slate-400">Mock Interviews Taken</p>
          <p className="mt-1 text-2xl font-extrabold text-indigo-400">6 Sessions</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-xs text-slate-400">Average Readiness</p>
          <p className="mt-1 text-2xl font-extrabold text-emerald-400">84%</p>
        </div>
      </div>

      {/* Edit Profile Form */}
      <form
        onSubmit={handleSaveProfile}
        className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Candidate Preferences</h2>
          {saved && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> Profile Updated!
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-slate-300">Full Name</label>
            <div className="relative mt-1.5">
              <User className="absolute top-3 left-3.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pr-4 pl-10 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* <div>
            <label className="block text-xs font-medium text-slate-300">
              Primary Interview Role
            </label>
            <div className="relative mt-1.5">
              <Briefcase className="absolute top-3 left-3.5 h-4 w-4 text-slate-500" />
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pr-4 pl-10 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Python & FastAPI Developer">Python & FastAPI Developer</option>
                <option value="React.js Frontend Engineer">React.js Frontend Engineer</option>
                <option value="Data Analyst (SQL & Pandas)">Data Analyst (SQL & Pandas)</option>
              </select>
            </div>
          </div> */}

          <div>
            <label className="block text-xs font-medium text-slate-300">
              Experience Level
            </label>
            <div className="relative mt-1.5">
              <Award className="absolute top-3 left-3.5 h-4 w-4 text-slate-500" />
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pr-4 pl-10 text-sm text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Fresher / 0-1 Years">Fresher / 0–1 Years</option>
                <option value="Junior / 1-3 Years">Junior / 1–3 Years</option>
                <option value="Mid-Level / 3+ Years">Mid-Level / 3+ Years</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300">Key Skills</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-5">
          {/* <button
            type="button"
            onClick={() => onStartInterview(targetRole)}
            className="rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-5 py-2.5 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/20"
          >
            Practice {targetRole} Interview
          </button> */}

          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}