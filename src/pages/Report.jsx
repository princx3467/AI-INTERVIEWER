import { useMemo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Trophy, RotateCcw, LayoutDashboard } from "lucide-react";
import { saveInterview } from "../api";

const generateMockScores = () => {
  const topics = ["Communication", "Technical Knowledge", "Problem Solving", "Confidence"];
  return topics.map((topic) => ({
    topic,
    score: Math.floor(Math.random() * 25) + 65,
  }));
};

const getScoreColor = (score) => {
  if (score >= 80) return "#22C55E";
  if (score >= 60) return "#F59E0B";
  return "#EF4444";
};

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
};

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const {
    transcript = [],
    duration = 0,
    role = "Frontend",
    difficulty = "Medium",
    type = "Technical",
  } = location.state || {};

  const scores = useMemo(() => generateMockScores(), []);
  const overallScore = Math.round(
    scores.reduce((sum, s) => sum + s.score, 0) / scores.length
  );
  const userAnswers = transcript.filter((t) => t.role === "user");

  // Save interview to database
  useEffect(() => {
    const save = async () => {
      const token = localStorage.getItem("token");
      if (!token || saved) return;

      try {
        await saveInterview(
          {
            role,
            difficulty,
            type,
            duration,
            transcript,
            scores,
          },
          token
        );
        setSaved(true);
        console.log("✅ Interview saved to database!");
      } catch (err) {
        console.error("Failed to save interview:", err);
      }
    };

    save();
  }, []);

  return (
    <div className="report-page">
      <div className="report-glow" />

      <div className="report-content">

        <div className="report-header">
          <div className="auth-logo">Mock<span>AI</span></div>
          <div className="session-tags">
            <span className="mock-tag-pill">{role}</span>
            <span className="mock-tag-pill">{difficulty}</span>
            <span className="mock-tag-pill">{type}</span>
          </div>
        </div>

        <div className="report-score-card">
          <Trophy size={32} color="#A855F7" />
          <p className="report-score-label">Overall Score</p>
          <h1 className="report-score-value" style={{ color: getScoreColor(overallScore) }}>
            {overallScore}%
          </h1>
          <p className="report-score-sub">
            {userAnswers.length} answers given over {formatTime(duration)}
          </p>
          {saved && (
            <p className="report-saved-badge">✅ Interview saved to your history</p>
          )}
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <h3 className="dash-card-title">Score Breakdown</h3>
          </div>
          <div className="score-breakdown">
            {scores.map((item) => (
              <div className="score-row" key={item.topic}>
                <span className="score-topic">{item.topic}</span>
                <div className="score-bar-wrapper">
                  <div
                    className="score-bar-fill"
                    style={{
                      width: `${item.score}%`,
                      background: getScoreColor(item.score),
                    }}
                  />
                </div>
                <span
                  className="score-pct"
                  style={{ color: getScoreColor(item.score) }}
                >
                  {item.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <h3 className="dash-card-title">Full Conversation</h3>
          </div>
          <div className="report-transcript">
            {transcript.length === 0 ? (
              <p className="session-empty">No conversation was recorded.</p>
            ) : (
              transcript.map((msg, i) => (
                <div
                  key={i}
                  className={`session-msg ${msg.role === "assistant" ? "msg-ai" : "msg-user"}`}
                >
                  <span className="msg-label">
                    {msg.role === "assistant" ? "MockAI" : "You"}
                  </span>
                  <div
                    className={`msg-bubble ${msg.role === "assistant" ? "bubble-ai" : "bubble-user"}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="report-actions">
          <button
            className="report-btn report-btn-secondary"
            onClick={() => navigate("/interview")}
          >
            <RotateCcw size={16} />
            Practice Again
          </button>
          <button
            className="report-btn report-btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard size={16} />
            Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

export default Report;