import { Bot, Mic, BarChart3, Sparkles, CheckCircle2 } from "lucide-react";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Select Your Target Role",
    description:
      "Pick a specialized track—such as Python & FastAPI, React.js, Data Analytics, or AI Engineering—tailored to your experience level.",
  },
  {
    step: "02",
    title: "Engage with the Virtual Interviewer",
    description:
      "Answer dynamic technical and behavioral questions via voice or text while the AI adapts follow-ups to your responses.",
  },
  {
    step: "03",
    title: "Review Instant AI Analytics",
    description:
      "Receive a detailed breakdown of your technical accuracy, communication clarity, and areas to improve before your real interview.",
  },
];

export default function AboutPage({ onStartInterview }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 text-white">
      {/* Hero Header */}
      <div className="text-center">
        <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-medium text-indigo-300">
          About InterviewPrep
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Bridging the Gap Between Preparation and Confidence
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
          InterviewPrep gives students and developers a realistic, judgment-free environment to practice technical interviews anytime—powered by conversational AI, speech recognition, and real-time analytics.
        </p>
      </div>

      {/* 3 Core Technology Pillars */}
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="inline-flex rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
            <Bot className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-lg font-bold">Interactive 3D Virtual Panel</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Simulate face-to-face interview pressure with an animated virtual interviewer and natural text-to-speech voice synthesis.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="inline-flex rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
            <Mic className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-lg font-bold">Speech & Context Understanding</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Speak naturally using Whisper Speech-to-Text while our LLM engine evaluates technical depth and asks smart follow-ups.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="inline-flex rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
            <BarChart3 className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-lg font-bold">Actionable Analytics</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Every completed session generates structured feedback and measurable metrics so you know exactly what to revise next.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-20">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">How InterviewPrep Works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6"
            >
              <span className="text-sm font-bold text-indigo-400">STEP {item.step}</span>
              <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="mt-20 rounded-2xl border border-indigo-500/30 bg-linear-to-r from-indigo-950/60 to-slate-900 p-8 text-center">
        <h2 className="text-2xl font-bold">Ready to test your skills?</h2>
        <p className="mt-2 text-slate-400">
          Jump into a mock interview session and get instant AI feedback in minutes.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Instant Evaluation
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Progress Tracking
          </span>
        </div>
        <button
          onClick={() => onStartInterview("Python & React Developer")}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500"
        >
          <Sparkles className="h-4 w-4" />
          Launch Mock Interview
        </button>
      </div>
    </div>
  );
}