import { Code2, Database, Layout, Cpu, ArrowRight } from "lucide-react";

const INTERVIEW_ROLES = [
  {
    id: "python-dev",
    title: "Python & FastAPI Developer",
    level: "Beginner to Intermediate",
    questions: 10,
    icon: Code2,
    tag: "Backend",
  },
  {
    id: "react-dev",
    title: "React.js Frontend Engineer",
    level: "Intermediate",
    questions: 10,
    icon: Layout,
    tag: "Frontend",
  },
  {
    id: "data-analyst",
    title: "Data Analyst (SQL & Pandas)",
    level: "Beginner",
    questions: 8,
    icon: Database,
    tag: "Analytics",
  },
  {
    id: "ai-ml",
    title: "AI & Computer Vision Engineer",
    level: "Advanced",
    questions: 12,
    icon: Cpu,
    tag: "AI / ML",
  },
];

export default function RoleSelector({ onSelectRole }) {
  return (
    <section id="roles" className="border-t border-slate-800 bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Choose Your Interview Track
          </h2>
          <p className="mt-3 text-slate-400">
            Select a role below to launch a tailored AI mock interview session.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INTERVIEW_ROLES.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                      {role.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-white group-hover:text-indigo-300">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">
                    {role.level} • {role.questions} Questions
                  </p>
                </div>

                <button
                  onClick={() => onSelectRole(role.title)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-2.5 text-sm font-semibold text-white transition group-hover:bg-indigo-600"
                >
                  Start Session <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}