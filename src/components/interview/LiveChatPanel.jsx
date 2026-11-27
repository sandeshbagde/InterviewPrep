import { useEffect, useRef } from "react";

export default function LiveChatPanel({ chatHistory, liveTranscript, isLive }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatHistory, liveTranscript]);

  return (
    <div className="flex h-full w-full shrink-0 flex-col border-t border-slate-800 bg-slate-900 lg:w-96 lg:border-t-0 lg:border-l">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <h2 className="text-xs font-bold tracking-wider text-slate-300 uppercase">
          Live Interview Transcript
        </h2>
        <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-400">
          {chatHistory.length} messages
        </span>
      </div>

      {/* Scrollable Messages */}
      <div ref={containerRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {chatHistory.length === 0 ? (
          <p className="py-10 text-center text-xs text-slate-500">
            Conversation transcript will appear here as the AI speaks...
          </p>
        ) : (
          chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "You" ? "items-end" : "items-start"
              }`}
            >
              <span className="mb-1 text-[10px] text-slate-500">
                {msg.sender} • {msg.time}
              </span>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.sender === "You"
                    ? "bg-indigo-600 text-white"
                    : msg.isAlert
                    ? "border border-amber-500/40 bg-amber-500/10 text-amber-200"
                    : "border border-slate-800 bg-slate-950 text-slate-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}

        {liveTranscript && isLive && (
          <div className="flex flex-col items-end">
            <span className="mb-1 text-[10px] text-emerald-400">
              You (speaking...)
            </span>
            <div className="max-w-[85%] rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs italic text-emerald-200">
              {liveTranscript}...
            </div>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="border-t border-slate-800 bg-slate-950/60 px-4 py-2.5 text-center text-[11px] text-slate-400">
        Lockdown & auto-pause active during session
      </div>
    </div>
  );
}