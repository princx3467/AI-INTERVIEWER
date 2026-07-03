import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getInterviews } from "../api";
import { Clock, Calendar, ChevronRight, Mic } from "lucide-react";

const getScoreColor = (score) => {
  if (!score) return "#6B6B8A";
  const avg = score.reduce((sum, s) => sum + s.score, 0) / score.length;
  if (avg >= 80) return "#22C55E";
  if (avg >= 60) return "#F59E0B";
  return "#EF4444";
};

const getAvgScore = (scores) => {
  if (!scores || scores.length === 0) return "N/A";
  const avg = scores.reduce((sum, s) => sum + s.score, 0) / scores.length;
  return `${Math.round(avg)}%`;
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
};

const History = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const data = await getInterviews(token);
        setInterviews(data);
      } catch (err) {
        setError("Failed to load interviews");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div className="dashboard-wrapper">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">Mock<span>AI</span></div>
        <nav className="sidebar-nav">
          {[
            { label: "Dashboard", path: "/dashboard" },
            { label: "Start Interview", path: "/interview" },
            { label: "History", path: "/history", active: true },
            { label: "Profile", path: "/profile" },
          ].map((item) => (
            <button
              key={item.label}
              className={`sidebar-item ${item.active ? "sidebar-item-active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button
            className="sidebar-logout"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        {/* Header */}
        <div className="dashboard-topbar">
          <div>
            <h1 className="dashboard-welcome">
              Interview <span>History</span>
            </h1>
            <p className="dashboard-date">
              All your past mock interviews
            </p>
          </div>
          <button
            className="start-btn"
            onClick={() => navigate("/interview")}
          >
            <Mic size={16} />
            New Interview
          </button>
        </div>

        {/* Content */}
        {loading && (
          <div className="history-loading">
            <p>Loading your interviews...</p>
          </div>
        )}

        {error && (
          <div className="auth-error">{error}</div>
        )}

        {!loading && interviews.length === 0 && (
          <div className="history-empty">
            <p className="history-empty-icon">🎙️</p>
            <h3>No interviews yet!</h3>
            <p>Start your first mock interview to see your history here.</p>
            <button
              className="start-btn"
              onClick={() => navigate("/interview")}
              style={{ marginTop: "20px" }}
            >
              Start Interview
            </button>
          </div>
        )}

        {!loading && interviews.length > 0 && (
          <div className="history-grid">
            {interviews.map((interview) => (
              <div className="history-card" key={interview.id}>

                {/* Card Header */}
                <div className="history-card-header">
                  <div className="history-card-tags">
                    <span className="mock-tag-pill">{interview.role}</span>
                    <span className="mock-tag-pill">{interview.difficulty}</span>
                    <span className="mock-tag-pill">{interview.type}</span>
                  </div>
                  <div
                    className="history-score"
                    style={{ color: getScoreColor(interview.scores) }}
                  >
                    {getAvgScore(interview.scores)}
                  </div>
                </div>

                {/* Card Meta */}
                <div className="history-card-meta">
                  <div className="history-meta-item">
                    <Calendar size={14} color="#6B6B8A" />
                    <span>{formatDate(interview.created_at)}</span>
                  </div>
                  <div className="history-meta-item">
                    <Clock size={14} color="#6B6B8A" />
                    <span>{formatDuration(interview.duration)}</span>
                  </div>
                </div>

                {/* Score Breakdown */}
                {interview.scores && (
                  <div className="history-scores">
                    {interview.scores.map((s) => (
                      <div className="history-score-row" key={s.topic}>
                        <span className="history-score-topic">{s.topic}</span>
                        <div className="score-bar-wrapper">
                          <div
                            className="score-bar-fill"
                            style={{
                              width: `${s.score}%`,
                              background: getScoreColor([s]),
                            }}
                          />
                        </div>
                        <span
                          className="history-score-pct"
                          style={{ color: getScoreColor([s]) }}
                        >
                          {s.score}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Transcript Count */}
                <div className="history-card-footer">
                  <span className="history-answers">
                    {interview.transcript
                      ? interview.transcript.filter((t) => t.role === "user").length
                      : 0}{" "}
                    answers given
                  </span>
                  <button className="history-view-btn">
                    View Details <ChevronRight size={14} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default History;