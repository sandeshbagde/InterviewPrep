import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Flame, Sparkles, User, LogOut, Menu, X } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/progress", label: "Progress" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2.5 text-xl font-bold text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
            <Flame className="h-5 w-5" />
          </span>
          <span>
            Interview<span className="text-indigo-400">Prep</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "font-semibold text-indigo-400"
                    : "text-slate-300 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side: Profile Link or Register/Login */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                    isActive
                      ? "border-indigo-500 bg-indigo-600/20 text-white"
                      : "border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-600"
                  }`
                }
              >
                <User className="h-3.5 w-3.5 text-indigo-400" />
                <span>{user.name}</span>
              </NavLink>
              <button
                type="button"
                onClick={onLogout}
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-rose-500/50 hover:text-rose-400"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500"
            >
              <Sparkles className="h-4 w-4" />
              Register / Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg border border-slate-800 p-2 text-slate-300 md:hidden"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="space-y-3 border-t border-slate-800 bg-slate-950 px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block py-1.5 text-sm font-medium ${
                  isActive ? "text-indigo-400" : "text-slate-300"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {user ? (
            <div className="flex flex-col gap-2 pt-2">
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 py-2.5 text-sm font-semibold text-white"
              >
                <User className="h-4 w-4 text-indigo-400" />
                My Profile ({user.name})
              </Link>
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  setMobileOpen(false);
                }}
                className="w-full rounded-xl bg-rose-600/20 py-2 text-sm font-semibold text-rose-400"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded-xl bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white"
            >
              Register / Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}