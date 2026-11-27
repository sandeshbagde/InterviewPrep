import { AlertTriangle, PhoneOff, ArrowLeft } from "lucide-react";

export default function EndConfirmModal({ answeredCount, totalQuestions, onCancel, onConfirmEnd }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-rose-500/30 bg-slate-900 p-6 text-center shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-400">
          <AlertTriangle className="h-7 w-7" />
        </div>

        <h2 className="mt-4 text-xl font-bold text-white">
          End Interview Early?
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          You have completed{" "}
          <span className="font-semibold text-white">
            {answeredCount} of {totalQuestions}
          </span>{" "}
          questions. If you end now, any remaining questions will be skipped and your session will close immediately.
        </p>

        <div className="mt-6 flex flex-col-reverse justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Interview
          </button>

          <button
            type="button"
            onClick={onConfirmEnd}
            className="flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition hover:bg-rose-500"
          >
            <PhoneOff className="h-4 w-4" />
            Yes, End Interview
          </button>
        </div>
      </div>
    </div>
  );
}