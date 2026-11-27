import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-10 text-sm text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-2 font-semibold text-white">
          <Flame className="h-4 w-4 text-indigo-400" />
          <span>InterviewPrep</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/progress" className="hover:text-white">Progress</Link>
          <Link to="/about" className="hover:text-white">About Us</Link>
          <Link to="/contact" className="hover:text-white">Contact Us</Link>
          <Link to="/profile" className="hover:text-white">Profile</Link>
          <Link to="/404" className="text-slate-500 hover:text-indigo-400">
            404 Preview
          </Link>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} InterviewPrep. Built for smart preparation.
        </p>
      </div>
    </footer>
  );
}