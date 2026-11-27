import { Award, RotateCcw, ShieldAlert } from "lucide-react";

export default function InterviewSummary({
  isTerminated,
  terminationReason,
  role,
  formattedTime,
  results,
  onRestart,
  onViewProgress,
  onExit,
}) {
  if (isTerminated) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-xl flex-col items-center justify-center px-6 py-12 text-center text-white">
        <div className="w-full rounded-2xl border border-rose-500/40 bg-slate-900 p-8 shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400">
            <ShieldAlert className="h-9 w-9" />
          </div>

          <span className="mt-4 inline-block rounded-full bg-rose-500/10 px-3 py-1 text-xs font-bold tracking-wider text-rose-400 uppercase">
            Interview Terminated
          </span>

          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
            Session Ended Due to Policy Violation
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {terminationReason ||
              "You switched screens multiple times or left your camera off during the proctored session."}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={onRestart}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              <RotateCcw className="h-4 w-4" />
              Start New Session
            </button>
            <button
              type="button"
              onClick={onExit}
              className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const avgScore =
    results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
      : 75;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 text-white">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
          <Award className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-3xl font-bold">Interview Completed</h1>
        <p className="mt-1 text-sm text-slate-400">
          {role} • Duration: {formattedTime}
        </p>

        <div className="mx-auto mt-6 inline-flex items-baseline gap-2 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 px-8 py-4">
          <span className="text-4xl font-extrabold text-indigo-400">{avgScore}%</span>
          <span className="text-sm text-slate-300">Overall Performance</span>
        </div>

        <div className="mt-8 space-y-4 text-left">
          {results.map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex justify-between gap-4">
                <p className="text-sm font-semibold text-white">
                  Q{i + 1}. {item.question}
                </p>
                <span className="text-xs font-bold text-indigo-400">{item.score}%</span>
              </div>
              <p className="mt-2 text-xs text-slate-400">Your Response: {item.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={onViewProgress}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            View Progress Dashboard
          </button>
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-2 rounded-xl bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            <RotateCcw className="h-4 w-4" /> Home
          </button>
        </div>
      </div>
    </div>
  );
}