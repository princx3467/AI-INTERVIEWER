import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VapiSDK from "@vapi-ai/web";

const Vapi = VapiSDK.default || VapiSDK;
const vapi = new Vapi(import.meta.env.VITE_VAPI_KEY);

const Session = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    role = "Frontend",
    difficulty = "Medium",
    type = "Technical",
  } = location.state || {};

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const transcriptEndRef = useRef(null);

  useEffect(() => {
    startInterview();
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
      vapi.stop();
    };
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  const startInterview = async () => {
    try {
      vapi.on("call-start", () => {});
      vapi.on("call-end", () => handleEnd());
      vapi.on("error", (e) => console.log("Vapi Error:", e));
      vapi.on("speech-start", () => setIsSpeaking(true));
      vapi.on("speech-end", () => setIsSpeaking(false));

      vapi.on("message", (message) => {
        if (
          message.type === "transcript" &&
          message.transcriptType === "final"
        ) {
          setTranscript((prev) => [
            ...prev,
            { role: message.role, text: message.transcript },
          ]);
        }
      });

      await vapi.start(import.meta.env.VITE_VAPI_ASSISTANT_ID);
    } catch (error) {
      console.error("Vapi error:", error);
    }
  };

  const handleEnd = () => {
    clearInterval(timerRef.current);
    vapi.stop();
    navigate("/report", {
      state: { transcript, duration: timer, role, difficulty, type },
    });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="session-page">
      <div className="session-topbar">
        <div className="auth-logo">Mock<span>AI</span></div>
        <div className="session-tags">
          <span className="mock-tag-pill">{role}</span>
          <span className="mock-tag-pill">{difficulty}</span>
          <span className="mock-tag-pill">{type}</span>
        </div>
        <div className="session-timer">⏱ {formatTime(timer)}</div>
      </div>

      <div className="session-body">
        <div className="session-left">
          <div className="session-avatar-card">
            <div className={`session-avatar ${isSpeaking ? "session-avatar-speaking" : ""}`}>
              <span className="session-avatar-icon">🤖</span>
              {isSpeaking && <div className="session-avatar-ring" />}
            </div>

            <div className="session-status">
              <div className={`session-dot ${isSpeaking ? "dot-speaking" : "dot-listening"}`} />
              {isSpeaking ? "AI is speaking..." : "Listening to you..."}
            </div>

            {isSpeaking && (
              <div className="session-waves">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="session-wave" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            )}

            <div className="session-question-box">
              <p className="session-question-label">Current Question</p>
              <p className="session-question-text">
                {transcript.filter((t) => t.role === "assistant").slice(-1)[0]?.text ||
                  "Waiting for AI to speak..."}
              </p>
            </div>
          </div>

          <div className="session-controls">
            <div className="session-mic">
              <div className="session-mic-icon">🎤</div>
              <div>
                <p className="session-mic-label">Your Microphone</p>
                <p className="session-mic-sub">
                  {isSpeaking ? "AI speaking — please wait" : "Speak your answer clearly"}
                </p>
              </div>
            </div>
            <button className="session-end-btn" onClick={handleEnd}>
              End Interview
            </button>
          </div>
        </div>

        <div className="session-right">
          <h3 className="session-convo-title">Conversation</h3>
          <div className="session-transcript">
            {transcript.length === 0 && (
              <p className="session-empty">Interview will appear here as you talk...</p>
            )}
            {transcript.map((msg, i) => (
              <div key={i} className={`session-msg ${msg.role === "assistant" ? "msg-ai" : "msg-user"}`}>
                <span className="msg-label">{msg.role === "assistant" ? "MockAI" : "You"}</span>
                <div className={`msg-bubble ${msg.role === "assistant" ? "bubble-ai" : "bubble-user"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>

          <div className="session-score-preview">
            <p className="session-score-label">Tracking scores</p>
            <div className="session-score-pills">
              {["DSA", "React", "System Design", "Communication"].map((t) => (
                <span key={t} className="score-topic-pill">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;