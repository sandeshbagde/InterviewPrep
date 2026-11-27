import { Flame } from "lucide-react";

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Flame className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold text-white">
            Interview<span className="text-indigo-400">Prep</span>
          </span>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <button
            onClick={() => onNavigate("home")}
            className="transition hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate("progress")}
            className="transition hover:text-white"
          >
            Progress
          </button>
          <button
            onClick={() => onNavigate("about")}
            className="transition hover:text-white"
          >
            About Us
          </button>
          <button
            onClick={() => onNavigate("contact")}
            className="transition hover:text-white"
          >
            Contact Us
          </button>
          <button
            onClick={() => onNavigate("404")}
            className="text-slate-500 transition hover:text-rose-400"
          >
            404 Preview
          </button>
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} InterviewPrep. All rights reserved.
        </p>
      </div>
    </footer>
  );
}