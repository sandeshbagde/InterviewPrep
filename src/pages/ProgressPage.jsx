import { useState } from "react";
import {
  Trophy,
  Target,
  Clock,
  TrendingUp,
  CheckCircle2,
  Filter,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const PAST_SESSIONS = [
  {
    id: 1,
    role: "Python & FastAPI Developer",
    category: "Python",
    date: "Nov 25, 2026",
    duration: "24 mins",
    score: 86,
    status: "Strong",
    feedback:
      "Clear explanation of async endpoints and Pydantic validation. Practice SQLAlchemy join optimization.",
  },
  {
    id: 2,
    role: "React.js Frontend Engineer",
    category: "React",
    date: "Nov 22, 2026",
    duration: "20 mins",
    score: 78,
    status: "Good",
    feedback:
      "Solid grasp of props and useState. Review useEffect cleanup functions and memoization.",
  },
  {
    id: 3,
    role: "Data Analyst (SQL & Pandas)",
    category: "SQL",
    date: "Nov 18, 2026",
    duration: "28 mins",
    score: 91,
    status: "Excellent",
    feedback:
      "Accurate window function queries and clean Pandas groupby explanations.",
  },
  {
    id: 4,
    role: "Python & FastAPI Developer",
    category: "Python",
    date: "Nov 14, 2026",
    duration: "18 mins",
    score: 68,
    status: "Needs Review",
    feedback:
      "Good basics, but missed key points on JWT token expiration and dependency injection.",
  },
];

const SKILL_BREAKDOWN = [
  { skill: "Technical Accuracy", percent: 84, color: "bg-indigo-500" },
  { skill: "Communication Clarity", percent: 89, color: "bg-emerald-500" },
  { skill: "Problem-Solving Approach", percent: 76, color: "bg-cyan-500" },
  { skill: "Confidence & Pacing", percent: 82, color: "bg-amber-500" },
];

export default function ProgressPage({ onStartInterview }) {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedSession, setSelectedSession] = useState(PAST_SESSIONS[0]);

  const categories = ["All", "Python", "React", "SQL"];

  const filteredSessions =
    selectedFilter === "All"
      ? PAST_SESSIONS
      : PAST_SESSIONS.filter((session) => session.category === selectedFilter);

  const getBadgeStyle = (status) => {
    switch (status) {
      case "Excellent":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Strong":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
      case "Good":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Interview Progress</h1>
          <p className="mt-1 text-slate-400">
            Track your mock interview scores, skill readiness, and AI feedback over time.
          </p>
        </div>
        <button
          onClick={() => onStartInterview("Full-Stack Developer")}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500"
        >
          <Sparkles className="h-4 w-4" />
          New Mock Session
        </button>
      </div>

      {/* Top KPI Cards */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-sm">Total Interviews</span>
            <CheckCircle2 className="h-5 w-5 text-indigo-400" />
          </div>
          <p className="mt-3 text-3xl font-bold">{PAST_SESSIONS.length}</p>
          <p className="mt-1 text-xs text-emerald-400">+2 completed this week</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-sm">Average Score</span>
            <Trophy className="h-5 w-5 text-amber-400" />
          </div>
          <p className="mt-3 text-3xl font-bold">81%</p>
          <p className="mt-1 text-xs text-emerald-400">+9% improvement</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-sm">Top Performing Track</span>
            <Target className="h-5 w-5 text-cyan-400" />
          </div>
          <p className="mt-3 text-xl font-bold">SQL & Pandas</p>
          <p className="mt-1 text-xs text-slate-400">Peak score: 91%</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-sm">Practice Time</span>
            <Clock className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="mt-3 text-3xl font-bold">90 mins</p>
          <p className="mt-1 text-xs text-slate-400">Across all sessions</p>
        </div>
      </div>

      {/* Skill Breakdown & AI Feedback Preview */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-semibold">Skill Readiness Breakdown</h2>
          </div>

          <div className="mt-6 space-y-5">
            {SKILL_BREAKDOWN.map((item) => (
              <div key={item.skill}>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">{item.skill}</span>
                  <span className="font-semibold text-white">{item.percent}%</span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                AI Evaluator Notes
              </span>
              <span className="text-xs text-slate-400">{selectedSession.date}</span>
            </div>
            <h3 className="mt-2 text-xl font-bold text-white">{selectedSession.role}</h3>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-sm leading-relaxed text-slate-300">
                "{selectedSession.feedback}"
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
            <div>
              <p className="text-xs text-slate-400">Session Score</p>
              <p className="text-2xl font-bold text-indigo-400">{selectedSession.score}%</p>
            </div>
            <button
              onClick={() => onStartInterview(selectedSession.role)}
              className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600"
            >
              Retake This Track
            </button>
          </div>
        </div>
      </div>

      {/* Filterable Session History */}
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Past Interview Sessions</h2>

          <div className="flex items-center gap-2">
            <Filter className="mr-1 h-4 w-4 text-slate-400" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  selectedFilter === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 divide-y divide-slate-800">
          {filteredSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setSelectedSession(session)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-4 text-left transition hover:bg-slate-800/60 ${
                selectedSession.id === session.id ? "bg-slate-800/40" : ""
              }`}
            >
              <div>
                <p className="font-medium text-white">{session.role}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {session.date} • Duration: {session.duration}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${getBadgeStyle(
                    session.status
                  )}`}
                >
                  {session.status}
                </span>
                <span className="w-12 text-right text-base font-bold text-indigo-400">
                  {session.score}%
                </span>
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}