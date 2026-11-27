import { VideoOff, Maximize2, Play, ShieldAlert } from "lucide-react";

export default function PausedOverlay({
  pauseReason, // "camera" | "lockdown"
  warningCount,
  maxWarnings,
  pauseCountdown,
  cameraError,
  onReconnectCamera,
  onReenterFullscreen,
  onEndNow,
}) {
  const isLockdownViolation = pauseReason === "lockdown";

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/95 p-6 text-center backdrop-blur-md">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
          isLockdownViolation
            ? "bg-rose-500/15 text-rose-400"
            : "bg-amber-500/15 text-amber-400"
        }`}
      >
        {isLockdownViolation ? (
          <ShieldAlert className="h-9 w-9 animate-pulse" />
        ) : (
          <VideoOff className="h-8 w-8" />
        )}
      </div>

      {isLockdownViolation && (
        <span className="mt-4 rounded-full border border-rose-500/40 bg-rose-500/15 px-4 py-1 text-xs font-bold tracking-wider text-rose-300 uppercase">
          Security Warning {warningCount} of {maxWarnings}
        </span>
      )}

      <h2 className="mt-3 text-2xl font-bold text-white">
        {isLockdownViolation
          ? "Warning: You Cannot Change Your Screen!"
          : "Interview Paused — Camera Got Off"}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
        {isLockdownViolation
          ? `Switching tabs, pressing Alt+Tab / Windows key, or exiting fullscreen is strictly prohibited. If you change your screen ${
              maxWarnings - warningCount === 0
                ? "again"
                : `${maxWarnings - warningCount} more time(s)`
            }, your interview will end immediately.`
          : "Your progress and timer are frozen. Turn your camera back on to resume automatically, or click below."}
      </p>

      <p className="mt-3 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-semibold text-amber-300">
        Auto-ending interview in {pauseCountdown} seconds if not resumed
      </p>

      {cameraError && (
        <p className="mt-3 text-xs text-rose-400">{cameraError}</p>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {isLockdownViolation ? (
          <button
            type="button"
            onClick={onReenterFullscreen}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
          >
            <Maximize2 className="h-4 w-4" />
            I Understand — Return to Interview
          </button>
        ) : (
          <button
            type="button"
            onClick={onReconnectCamera}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
          >
            <Play className="h-4 w-4 fill-current" />
            Reconnect Camera & Resume
          </button>
        )}

        <button
          type="button"
          onClick={onEndNow}
          className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
        >
          End Interview Now
        </button>
      </div>
    </div>
  );
}