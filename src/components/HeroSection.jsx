import { Play, Mic, BarChart3, CheckCircle2 } from "lucide-react";

export default function HeroSection({ onStartInterview }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-16 pb-24 text-white">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-160 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        {/* Left Column: Copy & CTA */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
            AI-Powered Virtual Interview Simulator
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Master Your Next Tech Interview with{" "}
            <span className="bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Real-Time AI
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-400">
            Practice realistic technical and behavioral interviews with an interactive 3D virtual interviewer, live speech-to-text transcription, and instant performance analytics.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onStartInterview("Python & React Developer")}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500"
            >
              <Play className="h-4 w-4 fill-current" />
              Try Free Interview
            </button>
            <a
              href="#roles"
              className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-base font-semibold text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
            >
              Explore Roles
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Voice & Text Modes
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Instant AI Scoring
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Mockup Preview */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500" />
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <span className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-indigo-300">
              Live Session • Python Backend
            </span>
          </div>

          {/* Simulated AI Question Box */}
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              AI Interviewer Question 2/5
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              "Can you explain the difference between synchronous and asynchronous endpoints in FastAPI, and when you would use each?"
            </p>
          </div>

          {/* Simulated Live Metrics */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                <Mic className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Speech Clarity</p>
                <p className="text-sm font-bold text-white">94% Optimal</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
              <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Technical Depth</p>
                <p className="text-sm font-bold text-white">8.8 / 10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}