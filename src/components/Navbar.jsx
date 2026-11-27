import { Flame, Sparkles, UserCircle2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ activePage, onNavigate, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "progress", label: "Progress" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleLinkClick = (pageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleLinkClick("home")}
          className="flex items-center gap-2.5 text-left"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
            <Flame className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Interview<span className="text-indigo-400">Prep</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-sm font-medium transition ${
                activePage === link.id
                  ? "text-indigo-400"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop Auth / User Profile */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-sm text-slate-200">
                <UserCircle2 className="h-4 w-4 text-indigo-400" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleLinkClick("auth")}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-500"
            >
              <Sparkles className="h-4 w-4" />
              Register / Login
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-4 md:hidden">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left text-sm font-medium ${
                  activePage === link.id ? "text-indigo-400" : "text-slate-300"
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="border-t border-slate-800 pt-3">
              {user ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-200">{user.name}</span>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-medium text-rose-400"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleLinkClick("auth")}
                  className="w-full rounded-lg bg-indigo-600 py-2 text-center text-sm font-semibold text-white"
                >
                  Register / Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}