import { useEffect, useRef } from "react";
import { Video, VideoOff, Camera, Mic } from "lucide-react";

export default function InterviewLobby({
  role,
  cameraReady,
  cameraError,
  stream,
  onTurnOnCamera,
  onStartInterview,
  onCancel,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, cameraReady]);

  return (
    <div className="mx-auto flex min-h-[82vh] max-w-2xl flex-col items-center justify-center px-6 py-10 text-center text-white">
      <div className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-medium text-indigo-300">
          <Video className="h-3.5 w-3.5" /> Proctored Live Video & Voice Room
        </span>

        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
          {role || "Technical Interview"}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
          Turn on your camera below to verify your video feed. If your camera turns off mid-interview, the session will pause automatically until reconnected.
        </p>

        {/* Camera Preview Box */}
        <div className="relative mx-auto mt-6 aspect-video w-full max-w-md overflow-hidden rounded-2xl border-2 border-slate-800 bg-slate-950">
          {cameraReady ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="h-full w-full -scale-x-100 object-cover"
              />
              <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Camera & Mic Ready
              </span>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-6 text-slate-400">
              <VideoOff className="h-10 w-10 text-slate-600" />
              <p className="mt-3 text-sm font-medium text-slate-300">
                Camera is currently off
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Interview cannot start until camera is enabled
              </p>
            </div>
          )}
        </div>

        {cameraError && (
          <div className="mx-auto mt-4 max-w-md rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs text-rose-300">
            {cameraError}
          </div>
        )}

        <div className="mt-7 flex flex-wrap justify-center gap-4">
          {!cameraReady ? (
            <button
              type="button"
              onClick={onTurnOnCamera}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
            >
              <Camera className="h-4 w-4" />
              Turn On Camera & Mic
            </button>
          ) : (
            <button
              type="button"
              onClick={onStartInterview}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500"
            >
              <Mic className="h-4 w-4" />
              Start Live Interview
            </button>
          )}

          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}