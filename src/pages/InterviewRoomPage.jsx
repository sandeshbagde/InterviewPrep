import { useState, useEffect, useRef } from "react";
import { Video, Radio, MessageSquare, PauseCircle, Lock, ShieldAlert } from "lucide-react";
import InterviewLobby from "../components/interview/InterviewLobby";
import VideoStage from "../components/interview/VideoStage";
import LiveChatPanel from "../components/interview/LiveChatPanel";
import PausedOverlay from "../components/interview/PausedOverlay";
import InterviewSummary from "../components/interview/InterviewSummary";
import EndConfirmModal from "../components/interview/EndConfirmModal";

const QUESTION_BANK = {
  "Python & FastAPI Developer": [
    "Hello! Welcome to InterviewPrep. Tell me briefly about your experience building backend APIs with Python and FastAPI.",
    "What is the difference between standard synchronous routes and async def endpoints in FastAPI?",
    "How does Pydantic validate incoming request data, and what happens when validation fails?",
    "How do you implement JWT authentication and password hashing in a production FastAPI backend?",
    "Finally, how would you diagnose and optimize a slow query in MySQL using SQLAlchemy?",
  ],
  "React.js Frontend Engineer": [
    "Hello! Welcome to InterviewPrep. Walk me through a React project you built recently and how you structured its components.",
    "Can you explain the difference between Props and State, and what triggers a component re-render?",
    "How does the useEffect hook work, and why do dependency arrays matter?",
    "How do you manage shared state across multiple components without messy prop drilling?",
    "Finally, what techniques do you use to keep a React and Tailwind CSS interface fast and responsive?",
  ],
  "Data Analyst (SQL & Pandas)": [
    "Hello! Welcome to InterviewPrep. How do you approach cleaning a raw dataset with missing values in Pandas?",
    "What is the practical difference between an INNER JOIN and a LEFT JOIN in SQL?",
    "When would you use a window function like ROW_NUMBER or RANK instead of a standard GROUP BY?",
    "How do you merge two large DataFrames in Pandas without accidentally duplicating rows?",
    "Finally, tell me about a time you turned raw data into an actionable insight.",
  ],
  default: [
    "Hello! I hope you are doing well. Let's begin with the interview. Tell me about yourself and your core technical strengths.",
    "Describe a challenging bug you encountered recently and how you debugged it step by step.",
    "How do you design a REST API so that it is clean, predictable, and easy for a frontend to consume?",
    "How do you structure your code so it stays modular and easy to maintain as a project grows?",
    "Finally, what technical skill are you actively sharpening right now?",
  ],
};

const PAUSE_GRACE_SECONDS = 30;
const MAX_SCREEN_WARNINGS = 3;

export default function InterviewRoomPage({ role, onExit, onViewProgress }) {
  const questions = QUESTION_BANK[role] || QUESTION_BANK.default;

  const [stage, setStage] = useState("lobby"); // "lobby" | "live" | "paused" | "terminated" | "summary"
  const [pauseReason, setPauseReason] = useState("camera"); // "camera" | "lockdown"
  const [warningCount, setWarningCount] = useState(0);
  const [terminationReason, setTerminationReason] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [pauseCountdown, setPauseCountdown] = useState(PAUSE_GRACE_SECONDS);
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  const [aiStatus, setAiStatus] = useState("idle");
  const [currentCaption, setCurrentCaption] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [chatOpen, setChatOpen] = useState(true);
  const [results, setResults] = useState([]);

  const streamRef = useRef(null);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const currentAnswerRef = useRef("");
  const questionIdxRef = useRef(0);
  const followUpRef = useRef(false);
  const isLiveRef = useRef(false);
  const aiSpeakingRef = useRef(false);
  const warningCountRef = useRef(0);
  const lastViolationTimeRef = useRef(0);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const addChatMessage = (sender, text, isAlert = false) => {
    setChatHistory((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        sender,
        text,
        isAlert,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const enterFullscreenAndLockKeys = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
      if (navigator.keyboard && navigator.keyboard.lock) {
        await navigator.keyboard.lock(["Escape"]);
      }
    } catch {}
  };

  const exitFullscreenAndUnlockKeys = async () => {
    try {
      if (navigator.keyboard && navigator.keyboard.unlock) {
        navigator.keyboard.unlock();
      }
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {}
  };

  const stopAllMedia = () => {
    isLiveRef.current = false;
    setShowEndConfirm(false);
    clearTimeout(silenceTimerRef.current);
    window.speechSynthesis?.cancel();
    try {
      recognitionRef.current?.stop();
    } catch {}
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    exitFullscreenAndUnlockKeys();
  };

  useEffect(() => () => stopAllMedia(), []);

  // Session timer
  useEffect(() => {
    if (stage !== "live") return;
    const timer = setInterval(() => setSecondsElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [stage]);

  // Screen / Tab / Window Switch Violation Handler
  const handleLockdownViolation = (detailText) => {
    if (!isLiveRef.current) return;

    const now = Date.now();
    if (now - lastViolationTimeRef.current < 800) return;
    lastViolationTimeRef.current = now;

    isLiveRef.current = false;
    setShowEndConfirm(false);
    clearTimeout(silenceTimerRef.current);
    window.speechSynthesis?.cancel();
    try {
      recognitionRef.current?.stop();
    } catch {}

    const nextStrike = warningCountRef.current + 1;
    warningCountRef.current = nextStrike;
    setWarningCount(nextStrike);

    if (nextStrike >= MAX_SCREEN_WARNINGS) {
      stopAllMedia();
      setTerminationReason(
        `Interview ended automatically after ${MAX_SCREEN_WARNINGS} screen-switching warnings (${detailText}).`
      );
      setStage("terminated");
      return;
    }

    const warningMsg = `Warning ${nextStrike}/${MAX_SCREEN_WARNINGS}: You cannot change your screen (${detailText}), otherwise your interview will end.`;
    addChatMessage("Security Alert", warningMsg, true);
    setPauseReason("lockdown");
    setPauseCountdown(PAUSE_GRACE_SECONDS);
    setStage("paused");

    try {
      const warnSpeech = new SpeechSynthesisUtterance(
        `Warning ${nextStrike} of ${MAX_SCREEN_WARNINGS}. You cannot change your screen, otherwise your interview will end.`
      );
      window.speechSynthesis.speak(warnSpeech);
    } catch {}
  };

  // LOCKDOWN EVENT LISTENERS
  useEffect(() => {
    if (stage !== "live" && stage !== "paused") return;

    const onFullscreenChange = () => {
      if (!document.fullscreenElement && isLiveRef.current) {
        handleLockdownViolation("exited fullscreen");
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden && isLiveRef.current) {
        handleLockdownViolation("switched browser tab or minimized");
      }
    };

    const onWindowBlur = () => {
      if (isLiveRef.current) {
        handleLockdownViolation("switched window via Alt+Tab or Windows key");
      }
    };

    const blockContextMenu = (e) => e.preventDefault();

    const blockKeys = (e) => {
      if (
        e.key === "Escape" ||
        e.key === "Meta" ||
        e.key === "OS" ||
        e.key === "F12" ||
        e.key === "F11" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && ["U", "S", "P", "T", "W", "N", "C", "V", "X"].includes(e.key.toUpperCase())) ||
        (e.altKey && ["ArrowLeft", "ArrowRight", "Tab"].includes(e.key))
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onWindowBlur);
    document.addEventListener("contextmenu", blockContextMenu);
    window.addEventListener("keydown", blockKeys, true);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onWindowBlur);
      document.removeEventListener("contextmenu", blockContextMenu);
      window.removeEventListener("keydown", blockKeys, true);
    };
  }, [stage]);

  // CAMERA WATCHDOG during live session
  useEffect(() => {
    if (stage !== "live") return;

    const onCameraLost = () => {
      if (!isLiveRef.current) return;
      isLiveRef.current = false;
      setShowEndConfirm(false);
      clearTimeout(silenceTimerRef.current);
      window.speechSynthesis?.cancel();
      try {
        recognitionRef.current?.stop();
      } catch {}
      setCameraReady(false);
      setPauseReason("camera");
      setPauseCountdown(PAUSE_GRACE_SECONDS);
      addChatMessage(
        "System",
        "Interview paused because your camera turned off. Reconnect to resume.",
        true
      );
      setStage("paused");
    };

    const track = streamRef.current?.getVideoTracks()[0];
    if (!track || track.readyState !== "live" || !track.enabled) {
      onCameraLost();
      return;
    }

    track.addEventListener("ended", onCameraLost);
    track.addEventListener("mute", onCameraLost);
    const poll = setInterval(() => {
      const t = streamRef.current?.getVideoTracks()[0];
      if (!t || t.readyState !== "live" || !t.enabled) onCameraLost();
    }, 1000);

    return () => {
      track.removeEventListener("ended", onCameraLost);
      track.removeEventListener("mute", onCameraLost);
      clearInterval(poll);
    };
  }, [stage]);

  // PAUSED GRACE COUNTDOWN + AUTO-RECOVERY
  useEffect(() => {
    if (stage !== "paused") return;

    const countdown = setInterval(() => {
      setPauseCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          stopAllMedia();
          setTerminationReason(
            pauseReason === "lockdown"
              ? "Interview ended because you did not return to the locked screen in time."
              : `Interview ended because your camera stayed off for more than ${PAUSE_GRACE_SECONDS} seconds.`
          );
          setStage("terminated");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    let poller = null;
    if (pauseReason === "camera") {
      poller = setInterval(async () => {
        try {
          const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          if (s.getVideoTracks()[0]?.readyState === "live") {
            clearInterval(countdown);
            clearInterval(poller);
            resumeWithStream(s);
          }
        } catch {}
      }, 2000);
    }

    return () => {
      clearInterval(countdown);
      if (poller) clearInterval(poller);
    };
  }, [stage, pauseReason]);

  const resumeWithStream = async (restoredStream) => {
    await enterFullscreenAndLockKeys();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = restoredStream;
    setCameraReady(true);
    setCameraError("");
    isLiveRef.current = true;
    setStage("live");

    const currentQ = questions[questionIdxRef.current];
    setTimeout(() => {
      speakAndListen(`Welcome back—your camera is reconnected. Let's resume. ${currentQ}`, false);
    }, 400);
  };

  const handleManualReconnectCamera = async () => {
    setCameraError("");
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (s.getVideoTracks()[0]?.readyState === "live") {
        await resumeWithStream(s);
      }
    } catch {
      setCameraError("Camera is still blocked or disconnected. Enable it in your browser.");
    }
  };

  const handleReenterFullscreen = async () => {
    await enterFullscreenAndLockKeys();
    if (!document.fullscreenElement) return;

    const track = streamRef.current?.getVideoTracks()[0];
    if (!track || track.readyState !== "live") {
      setPauseReason("camera");
      return;
    }

    lastViolationTimeRef.current = Date.now();
    isLiveRef.current = true;
    setStage("live");
    const currentQ = questions[questionIdxRef.current];
    setTimeout(() => {
      speakAndListen(
        `Please keep this screen active for the rest of the interview. ${currentQ}`,
        false
      );
    }, 400);
  };

  const handleTurnOnCamera = async () => {
    setCameraError("");
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const track = s.getVideoTracks()[0];
      if (!track || track.readyState !== "live") {
        setCameraError("Camera failed to start. Check your webcam.");
        return;
      }
      track.onended = () => {
        if (!isLiveRef.current) {
          setCameraReady(false);
          setCameraError("Camera turned off. Turn it back on to start.");
        }
      };
      streamRef.current = s;
      setCameraReady(true);
    } catch {
      setCameraReady(false);
      setCameraError("Camera & Mic access is required. Allow permissions in your browser.");
    }
  };

  const speakAndListen = (text, isInterruption = false) => {
    if (!isLiveRef.current) return;
    aiSpeakingRef.current = true;
    setAiStatus("speaking");
    setCurrentCaption(text);
    addChatMessage("AI Interviewer", text, isInterruption);

    try {
      recognitionRef.current?.stop();
    } catch {}

    window.speechSynthesis?.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.02;
    utterance.onend = () => {
      aiSpeakingRef.current = false;
      if (isLiveRef.current) startListening();
    };
    utterance.onerror = () => {
      aiSpeakingRef.current = false;
      if (isLiveRef.current) startListening();
    };
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!isLiveRef.current) return;
    setAiStatus("listening");
    currentAnswerRef.current = "";
    setLiveTranscript("");
    try {
      recognitionRef.current?.start();
    } catch {}
  };

  const handleTurnEvaluation = () => {
    if (!isLiveRef.current || aiSpeakingRef.current) return;
    const spoken = currentAnswerRef.current.trim();
    if (!spoken) return;

    try {
      recognitionRef.current?.stop();
    } catch {}

    setAiStatus("thinking");
    addChatMessage("You", spoken);
    setLiveTranscript("");

    const words = spoken.split(/\s+/).length;
    const currentQ = questions[questionIdxRef.current];

    if (words < 12 && !followUpRef.current) {
      followUpRef.current = true;
      setTimeout(() => {
        speakAndListen(
          "Hold on—that was quite brief. Could you expand on that with a concrete example?",
          true
        );
      }, 600);
      return;
    }

    const score = Math.min(96, Math.max(70, 68 + Math.floor(words * 0.75)));
    setResults((prev) => [...prev, { question: currentQ, answer: spoken, score }]);

    const nextIdx = questionIdxRef.current + 1;
    if (nextIdx < questions.length) {
      questionIdxRef.current = nextIdx;
      followUpRef.current = false;
      setQuestionIndex(nextIdx);
      const transition =
        words > 45
          ? `Got it, thanks for the detailed breakdown. Moving on: ${questions[nextIdx]}`
          : `Understood. Let's move to the next question. ${questions[nextIdx]}`;
      setTimeout(() => speakAndListen(transition, false), 700);
    } else {
      const closing =
        "Thank you for your time today. That concludes our interview. Exiting lockdown mode to show your summary.";
      setCurrentCaption(closing);
      addChatMessage("AI Interviewer", closing);
      window.speechSynthesis?.cancel();
      const endUtterance = new SpeechSynthesisUtterance(closing);
      endUtterance.onend = () => {
        stopAllMedia();
        setStage("summary");
      };
      window.speechSynthesis.speak(endUtterance);
    }
  };

  const handleStartLiveInterview = async () => {
    if (!cameraReady || streamRef.current?.getVideoTracks()[0]?.readyState !== "live") {
      setCameraReady(false);
      setCameraError("Camera is off. Turn on your camera before starting.");
      return;
    }

    await enterFullscreenAndLockKeys();
    lastViolationTimeRef.current = Date.now();
    warningCountRef.current = 0;
    setWarningCount(0);

    setStage("live");
    isLiveRef.current = true;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-IN";

      recognition.onresult = (event) => {
        if (aiSpeakingRef.current || !isLiveRef.current) return;
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const piece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            currentAnswerRef.current = `${currentAnswerRef.current} ${piece}`.trim();
          } else {
            interim += piece;
          }
        }
        const combined = `${currentAnswerRef.current} ${interim}`.trim();
        setLiveTranscript(combined);

        if (combined.split(/\s+/).length >= 65 && !followUpRef.current) {
          clearTimeout(silenceTimerRef.current);
          followUpRef.current = true;
          addChatMessage("You", combined);
          setLiveTranscript("");
          speakAndListen(
            "Sorry to interrupt—let me pause you there so we cover everything. What was your key takeaway?",
            true
          );
          return;
        }

        clearTimeout(silenceTimerRef.current);
        if (currentAnswerRef.current.length > 0) {
          silenceTimerRef.current = setTimeout(handleTurnEvaluation, 2600);
        }
      };

      recognition.onend = () => {
        if (isLiveRef.current && !aiSpeakingRef.current) {
          try {
            recognition.start();
          } catch {}
        }
      };

      recognitionRef.current = recognition;
    }

    setTimeout(() => speakAndListen(questions[0], false), 500);
  };

  // Opens warning dialog instead of immediately closing
  const handleRequestEndInterview = () => {
    setShowEndConfirm(true);
  };

  // Executed only after user confirms in EndConfirmModal
  const handleConfirmEndInterview = () => {
    stopAllMedia();
    if (results.length > 0) setStage("summary");
    else onExit();
  };

  if (stage === "lobby") {
    return (
      <InterviewLobby
        role={role}
        cameraReady={cameraReady}
        cameraError={cameraError}
        stream={streamRef.current}
        onTurnOnCamera={handleTurnOnCamera}
        onStartInterview={handleStartLiveInterview}
        onCancel={() => {
          stopAllMedia();
          onExit();
        }}
      />
    );
  }

  if (stage === "terminated" || stage === "summary") {
    return (
      <InterviewSummary
        isTerminated={stage === "terminated"}
        terminationReason={terminationReason}
        role={role}
        formattedTime={formatTime(secondsElapsed)}
        results={results}
        onRestart={() => {
          setCameraError("");
          setTerminationReason("");
          setWarningCount(0);
          warningCountRef.current = 0;
          setResults([]);
          setChatHistory([]);
          setQuestionIndex(0);
          questionIdxRef.current = 0;
          setSecondsElapsed(0);
          setStage("lobby");
        }}
        onViewProgress={onViewProgress}
        onExit={onExit}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white select-none">
      {/* Confirmation Warning Modal before ending interview */}
      {showEndConfirm && (
        <EndConfirmModal
          answeredCount={results.length}
          totalQuestions={questions.length}
          onCancel={() => setShowEndConfirm(false)}
          onConfirmEnd={handleConfirmEndInterview}
        />
      )}

      {/* Top Lockdown Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Lock className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">
              {role || "AI Technical Interview"}
            </h1>
            <p className="text-xs text-slate-400">
              Question {questionIndex + 1} of {questions.length} •{" "}
              {stage === "paused"
                ? "LOCKDOWN PAUSED"
                : `LockDown Active (${formatTime(secondsElapsed)})`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {warningCount > 0 && (
            <span className="flex items-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-500/15 px-3 py-1.5 text-xs font-bold text-rose-300">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
              Warnings: {warningCount}/{MAX_SCREEN_WARNINGS}
            </span>
          )}

          {stage === "paused" ? (
            <span className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300">
              <PauseCircle className="h-3.5 w-3.5 text-amber-400" />
              Paused ({pauseCountdown}s)
            </span>
          ) : (
            <>
              <span className="hidden items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 md:flex">
                <Lock className="h-3.5 w-3.5 text-amber-400" />
                Screen Locked
              </span>
              <span className="hidden items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300 sm:flex">
                <Video className="h-3.5 w-3.5 text-indigo-400" />
                Camera On
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                <Radio className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
                Mic Live
              </span>
            </>
          )}

          <button
            type="button"
            onClick={() => setChatOpen((prev) => !prev)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
          >
            <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />
            {chatOpen ? "Hide Chat" : "Show Chat"}
          </button>
        </div>
      </div>

      {/* Full-Height Video Stage + Right Chat Box */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
        <VideoStage
          stream={streamRef.current}
          isPaused={stage === "paused"}
          aiStatus={aiStatus}
          currentCaption={currentCaption}
          liveTranscript={liveTranscript}
          onEndInterview={handleRequestEndInterview}
        >
          {stage === "paused" && (
            <PausedOverlay
              pauseReason={pauseReason}
              warningCount={warningCount}
              maxWarnings={MAX_SCREEN_WARNINGS}
              pauseCountdown={pauseCountdown}
              cameraError={cameraError}
              onReconnectCamera={handleManualReconnectCamera}
              onReenterFullscreen={handleReenterFullscreen}
              onEndNow={handleRequestEndInterview}
            />
          )}
        </VideoStage>

        {chatOpen && (
          <div className="flex h-72 w-full shrink-0 lg:h-full lg:w-96">
            <LiveChatPanel
              chatHistory={chatHistory}
              liveTranscript={liveTranscript}
              isLive={stage === "live"}
            />
          </div>
        )}
      </div>
    </div>
  );
}