import { useEffect, useRef } from "react";
import { Mic, PhoneOff, Volume2, Sparkles } from "lucide-react";

export default function VideoStage({
  stream,
  isPaused,
  aiStatus,
  currentCaption,
  liveTranscript,
  onEndInterview,
  children,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, isPaused]);

  return (
    <div className="relative flex min-h-120 flex-1 flex-col justify-between bg-linear-to-b from-slate-900 via-sky-950/35 to-slate-950 p-5">
      {/* Paused Overlay slot */}
      {children}

      {/* Top-Right Candidate Webcam PiP */}
      <div className="absolute top-4 right-4 z-20 h-28 w-40 overflow-hidden rounded-xl border-2 border-emerald-500/50 bg-slate-900 shadow-2xl sm:h-32 sm:w-44">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="h-full w-full -scale-x-100 object-cover"
        />
        <span className="absolute bottom-1.5 left-2 flex items-center gap-1 rounded bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> You
        </span>
      </div>

      {/* Center Virtual AI Interviewer */}
      <div className="my-auto flex flex-col items-center justify-center pt-6">
        <div className="relative">
          {aiStatus === "speaking" && !isPaused && (
            <span className="absolute -inset-4 animate-ping rounded-full bg-indigo-500/20" />
          )}

          <div
            className={`relative flex h-32 w-32 items-center justify-center rounded-full border-4 bg-linear-to-b from-indigo-500/20 to-slate-900 shadow-2xl transition-all duration-300 ${
              isPaused
                ? "border-amber-500/50 opacity-60"
                : aiStatus === "speaking"
                ? "scale-105 border-indigo-400 shadow-indigo-500/30"
                : aiStatus === "listening"
                ? "border-emerald-400 shadow-emerald-500/20"
                : "border-slate-700"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                AI
              </div>
              <div className="mt-1.5 h-5 w-16 rounded-t-full bg-indigo-500/40" />
            </div>

            <span className="absolute -bottom-2.5 flex items-center gap-1 rounded-full bg-slate-900 px-3 py-0.5 text-[11px] font-semibold text-indigo-300 ring-1 ring-slate-700">
              {isPaused ? (
                "Paused"
              ) : aiStatus === "speaking" ? (
                <>
                  <Volume2 className="h-3 w-3 animate-bounce text-indigo-400" /> Speaking
                </>
              ) : aiStatus === "listening" ? (
                <>
                  <Sparkles className="h-3 w-3 animate-pulse text-emerald-400" /> Listening
                </>
              ) : (
                "Evaluating..."
              )}
            </span>
          </div>
        </div>

        <p className="mt-4 text-sm font-semibold text-slate-200">
          Aarav • Senior AI Interviewer
        </p>
      </div>

      {/* Bottom Live Captions */}
      <div className="z-10 mx-auto my-3 w-full max-w-2xl rounded-xl bg-black/80 px-5 py-3 text-center backdrop-blur-md">
        <p className="text-sm leading-relaxed font-medium text-white">
          {currentCaption}
        </p>
        {liveTranscript && !isPaused && (
          <p className="mt-1 text-xs text-emerald-300 italic">
            You: "{liveTranscript}..."
          </p>
        )}
      </div>

      {/* Bottom Bar: Status Pill + End Interview Button */}
      <div className="z-20 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 pt-3">
        <div className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs text-slate-300 ring-1 ring-slate-800">
          <Mic className="h-3.5 w-3.5 text-emerald-400" />
          {isPaused
            ? "Paused until camera returns..."
            : aiStatus === "listening"
            ? "Speak your answer now..."
            : aiStatus === "speaking"
            ? "AI is asking a question..."
            : "Evaluating response..."}
        </div>

        <button
          type="button"
          onClick={onEndInterview}
          className="flex items-center gap-2 rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-600/25 transition hover:bg-rose-500"
        >
          <PhoneOff className="h-4 w-4" />
          End Interview
        </button>
      </div>
    </div>
  );
}