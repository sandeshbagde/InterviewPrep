import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 text-white">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left Info Column */}
        <div>
          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-medium text-indigo-300">
            Contact Us
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Get in Touch
          </h1>
          <p className="mt-4 leading-relaxed text-slate-400">
            Have a question about InterviewPrep, want to suggest a new technical interview track, or need help with your account? Send us a message and we will respond promptly.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Email Support</p>
                <p className="mt-0.5 text-sm text-slate-400">support@interviewprep.ai</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Track Requests</p>
                <p className="mt-0.5 text-sm text-slate-400">
                  Request custom role simulations for campus placements or tech roles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Location</p>
                <p className="mt-0.5 text-sm text-slate-400">Pune, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-emerald-500/10 p-4 text-emerald-400">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Message Sent!</h3>
              <p className="mt-2 max-w-sm text-sm text-slate-400">
                Thanks for reaching out, <span className="text-white">{formData.name}</span>. We have received your message regarding{" "}
                <span className="text-indigo-400">{formData.subject}</span> and will reply to{" "}
                <span className="text-white">{formData.email}</span> soon.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    subject: "General Inquiry",
                    message: "",
                  });
                }}
                className="mt-6 rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@gmail.com"
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Request Interview Track">Request Interview Track</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-500"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}