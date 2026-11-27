import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage({ onNavigate }) {
  return (
    <div className="flex min-h-[78vh] flex-col items-center justify-center px-6 py-16 text-center text-white">
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-400">
        <AlertTriangle className="h-10 w-10" />
      </div>

      <p className="mt-6 text-sm font-bold tracking-widest text-indigo-400 uppercase">
        Error 404
      </p>

      <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
        Page Not Found
      </h1>

      <p className="mt-4 max-w-md text-slate-400">
        Looks like this interview room doesn't exist or the link has moved. Let's get you back on track.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </button>

        <button
          onClick={() => onNavigate("progress")}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          View Progress
        </button>
      </div>
    </div>
  );
}