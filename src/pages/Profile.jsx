import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe, getInterviews } from "../api";
import { User, Mail, Calendar, Mic, TrendingUp, LogOut } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [interviews, setInterviews] = useState([]);
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
        console.error("Failed to load profile:", err);
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

  const getAvgScore = () => {
    if (interviews.length === 0) return "N/A";
    const total = interviews.reduce((sum, interview) => {
      if (!interview.scores) return sum;
      const avg = interview.scores.reduce((s, sc) => s + sc.score, 0) / interview.scores.length;
      return sum + avg;
    }, 0);
    return `${Math.round(total / interviews.length)}%`;
  };

  const getBestScore = () => {
    if (interviews.length === 0) return "N/A";
    let best = 0;
    interviews.forEach((interview) => {
      if (!interview.scores) return;
      const avg = interview.scores.reduce((s, sc) => s + sc.score, 0) / interview.scores.length;
      if (avg > best) best = avg;
    });
    return `${Math.round(best)}%`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <aside className="sidebar">
          <div className="sidebar-logo">Mock<span>AI</span></div>
        </aside>
        <main className="dashboard-main">
          <div className="history-loading">Loading profile...</div>
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
          {[
            { label: "Dashboard", path: "/dashboard" },
            { label: "Start Interview", path: "/interview" },
            { label: "History", path: "/history" },
            { label: "Profile", path: "/profile", active: true },
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
          <button className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        {/* Header */}
        <div className="dashboard-topbar">
          <div>
            <h1 className="dashboard-welcome">
              My <span>Profile</span>
            </h1>
            <p className="dashboard-date">
              Manage your account details
            </p>
          </div>
        </div>

        <div className="profile-grid">

          {/* Left — User Info */}
          <div className="profile-left">

            {/* Avatar Card */}
            <div className="dash-card profile-avatar-card">
              <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="profile-name">{user?.name}</h2>
              <p className="profile-email">{user?.email}</p>
              <button
                className="profile-logout-btn"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>

            {/* Details Card */}
            <div className="dash-card">
              <div className="dash-card-header">
                <h3 className="dash-card-title">Account Details</h3>
              </div>
              <div className="profile-details">
                <div className="profile-detail-row">
                  <div className="profile-detail-icon">
                    <User size={16} color="#A855F7" />
                  </div>
                  <div>
                    <p className="profile-detail-label">Full Name</p>
                    <p className="profile-detail-value">{user?.name}</p>
                  </div>
                </div>
                <div className="profile-detail-row">
                  <div className="profile-detail-icon">
                    <Mail size={16} color="#A855F7" />
                  </div>
                  <div>
                    <p className="profile-detail-label">Email</p>
                    <p className="profile-detail-value">{user?.email}</p>
                  </div>
                </div>
                <div className="profile-detail-row">
                  <div className="profile-detail-icon">
                    <Calendar size={16} color="#A855F7" />
                  </div>
                  <div>
                    <p className="profile-detail-label">Member Since</p>
                    <p className="profile-detail-value">
                      {formatDate(user?.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right — Stats */}
          <div className="profile-right">

            {/* Stats Cards */}
            <div className="profile-stats-grid">
              <div className="profile-stat-card">
                <div className="stat-icon-box">
                  <Mic size={20} color="#A855F7" />
                </div>
                <p className="stat-label">Total Interviews</p>
                <h3 className="stat-value">{interviews.length}</h3>
              </div>
              <div className="profile-stat-card">
                <div className="stat-icon-box">
                  <TrendingUp size={20} color="#22C55E" />
                </div>
                <p className="stat-label">Average Score</p>
                <h3 className="stat-value">{getAvgScore()}</h3>
              </div>
              <div className="profile-stat-card">
                <div className="stat-icon-box">
                  <TrendingUp size={20} color="#F59E0B" />
                </div>
                <p className="stat-label">Best Score</p>
                <h3 className="stat-value">{getBestScore()}</h3>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dash-card">
              <div className="dash-card-header">
                <h3 className="dash-card-title">Recent Activity</h3>
              </div>
              <div className="interviews-list">
                {interviews.length === 0 ? (
                  <p className="session-empty">No interviews yet!</p>
                ) : (
                  interviews.slice(0, 5).map((interview) => (
                    <div className="interview-row" key={interview.id}>
                      <div className="interview-info">
                        <p className="interview-role">{interview.role}</p>
                        <div className="interview-meta">
                          <span className="interview-type">{interview.type}</span>
                          <span className="interview-level">{interview.difficulty}</span>
                        </div>
                      </div>
                      <div className="interview-score" style={{
                        color: interview.scores
                          ? interview.scores.reduce((s, sc) => s + sc.score, 0) / interview.scores.length >= 80
                            ? "#22C55E"
                            : "#F59E0B"
                          : "#6B6B8A"
                      }}>
                        {interview.scores
                          ? `${Math.round(interview.scores.reduce((s, sc) => s + sc.score, 0) / interview.scores.length)}%`
                          : "N/A"}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default Profile;