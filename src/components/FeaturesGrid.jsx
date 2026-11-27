import { Bot, Mic, LineChart, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    title: "3D Virtual Interviewer",
    description:
      "Interactive avatar with realistic speaking animations and lip-sync cues.",
    icon: Bot,
  },
  {
    title: "Whisper Speech-to-Text",
    description:
      "Speak naturally—your answers are transcribed accurately in real time.",
    icon: Mic,
  },
  {
    title: "Data-Driven Analytics",
    description:
      "Track confidence, keyword coverage, and historical progress via charts.",
    icon: LineChart,
  },
  {
    title: "Adaptive Follow-Ups",
    description:
      "Dynamic LLM questioning that adjusts difficulty based on your responses.",
    icon: ShieldCheck,
  },
];

export default function FeaturesGrid() {
  return (
    <section
      id="features"
      className="border-t border-slate-800 bg-slate-950 py-20 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built for Realistic Practice
          </h2>
          <p className="mt-3 text-slate-400">
            Everything you need to simulate a real technical panel from your browser.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6"
              >
                <div className="inline-flex rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feat.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}