import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Mic,
  Clock,
  FileText,
  User,
  LogOut,
  ChevronRight,
  TrendingUp,
  Target,
  Calendar,
} from "lucide-react";
import { getInterviews, getMe } from "../api";

const getScoreColor = (score) => {
  if (score >= 80) return "#22C55E";
  if (score >= 60) return "#F59E0B";
  return "#EF4444";
};

const getAvgScore = (interviews) => {
  if (interviews.length === 0) return 0;
  const total = interviews.reduce((sum, interview) => {
    if (!interview.scores) return sum;
    const avg = interview.scores.reduce((s, sc) => s + sc.score, 0) / interview.scores.length;
    return sum + avg;
  }, 0);
  return Math.round(total / interviews.length);
};

const getBestScore = (interviews) => {
  if (interviews.length === 0) return 0;
  let best = 0;
  interviews.forEach((interview) => {
    if (!interview.scores) return;
    const avg = interview.scores.reduce((s, sc) => s + sc.score, 0) / interview.scores.length;
    if (avg > best) best = avg;
  });
  return Math.round(best);
};

const getTopicAverages = (interviews) => {
  const topicMap = {};
  const topicCount = {};

  interviews.forEach((interview) => {
    if (!interview.scores) return;
    interview.scores.forEach((s) => {
      if (!topicMap[s.topic]) {
        topicMap[s.topic] = 0;
        topicCount[s.topic] = 0;
      }
      topicMap[s.topic] += s.score;
      topicCount[s.topic]++;
    });
  });

  return Object.keys(topicMap).map((topic) => ({
    label: topic,
    score: Math.round(topicMap[topic] / topicCount[topic]),
  }));
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const navItems = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", path: "/dashboard" },
  { icon: <Mic size={18} />, label: "Start Interview", path: "/interview" },
  { icon: <Clock size={18} />, label: "History", path: "/history" },
  { icon: <FileText size={18} />, label: "Resume", path: "/resume" },
  { icon: <User size={18} />, label: "Profile", path: "/profile" },
];

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [interviews, setInterviews] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const [userData, interviewData] = await Promise.all([
          getMe(token),
          getInterviews(token),
        ]);
        setUser(userData);
        setInterviews(interviewData);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const avgScore = getAvgScore(interviews);
  const bestScore = getBestScore(interviews);
  const topicAverages = getTopicAverages(interviews);
  const recentInterviews = interviews.slice(0, 4);

  const stats = [
    {
      icon: <Mic size={20} color="#A855F7" />,
      label: "Total Interviews",
      value: interviews.length.toString(),
      change: interviews.length > 0 ? "Keep practicing!" : "Start your first!",
    },
    {
      icon: <TrendingUp size={20} color="#22C55E" />,
      label: "Average Score",
      value: interviews.length > 0 ? `${avgScore}%` : "N/A",
      change: "Across all interviews",
    },
    {
      icon: <Target size={20} color="#F59E0B" />,
      label: "Best Score",
      value: interviews.length > 0 ? `${bestScore}%` : "N/A",
      change: "Your personal best",
    },
    {
      icon: <Calendar size={20} color="#3B82F6" />,
      label: "Member Since",
      value: user ? new Date(user.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" }) : "N/A",
      change: "Welcome to MockAI!",
    },
  ];

  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <aside className="sidebar">
          <div className="sidebar-logo">Mock<span>AI</span></div>
        </aside>
        <main className="dashboard-main">
          <div className="history-loading">Loading dashboard...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">Mock<span>AI</span></div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`sidebar-item ${activeNav === item.label ? "sidebar-item-active" : ""}`}
              onClick={() => {
                setActiveNav(item.label);
                if (item.path) navigate(item.path);
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        {/* Top Bar */}
        <div className="dashboard-topbar">
          <div>
            <h1 className="dashboard-welcome">
              Welcome back, <span>{user?.name?.split(" ")[0]}</span> 👋
            </h1>
            <p className="dashboard-date">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <button className="start-btn" onClick={() => navigate("/interview")}>
            <Mic size={16} />
            Start Interview
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-icon-box">{stat.icon}</div>
              <div>
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-change">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="dashboard-grid">

          {/* Recent Interviews */}
          <div className="dash-card">
            <div className="dash-card-header">
              <h3 className="dash-card-title">Recent Interviews</h3>
              <button
                className="dash-see-all"
                onClick={() => navigate("/history")}
              >
                See all <ChevronRight size={14} />
              </button>
            </div>

            {recentInterviews.length === 0 ? (
              <div className="history-empty" style={{ padding: "20px" }}>
                <p style={{ fontSize: "14px", color: "#6B6B8A" }}>
                  No interviews yet. Start your first one!
                </p>
              </div>
            ) : (
              <div className="interviews-list">
                {recentInterviews.map((item) => (
                  <div className="interview-row" key={item.id}>
                    <div className="interview-info">
                      <p className="interview-role">{item.role}</p>
                      <div className="interview-meta">
                        <span className="interview-type">{item.type}</span>
                        <span className="interview-level">{item.difficulty}</span>
                        <span className="interview-date">
                          {formatDate(item.created_at)}
                        </span>
                      </div>
                    </div>
                    <div
                      className="interview-score"
                      style={{
                        color: item.scores
                          ? getScoreColor(
                              Math.round(
                                item.scores.reduce((s, sc) => s + sc.score, 0) /
                                  item.scores.length
                              )
                            )
                          : "#6B6B8A",
                      }}
                    >
                      {item.scores
                        ? `${Math.round(
                            item.scores.reduce((s, sc) => s + sc.score, 0) /
                              item.scores.length
                          )}%`
                        : "N/A"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Score Breakdown */}
          <div className="dash-card">
            <div className="dash-card-header">
              <h3 className="dash-card-title">Score Breakdown</h3>
            </div>
            {topicAverages.length === 0 ? (
              <p style={{ fontSize: "14px", color: "#6B6B8A" }}>
                Complete an interview to see your scores!
              </p>
            ) : (
              <div className="score-breakdown">
                {topicAverages.map((item) => (
                  <div className="score-row" key={item.label}>
                    <span className="score-topic">{item.label}</span>
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
            )}
          </div>

        </div>

      </main>
    </div>
  );
};

export default Dashboard;