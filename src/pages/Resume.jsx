import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Mic,
  Clock,
  FileText,
  User,
  LogOut,
  UploadCloud,
  File,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const navItems = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard", path: "/dashboard" },
  { icon: <Mic size={18} />, label: "Start Interview", path: "/interview" },
  { icon: <Clock size={18} />, label: "History", path: "/history" },
  { icon: <FileText size={18} />, label: "Resume", path: "/resume" },
  { icon: <User size={18} />, label: "Profile", path: "/profile" },
];

const ACCEPTED_TYPES = [".pdf", ".doc", ".docx"];
const MAX_SIZE_MB = 5;

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const Resume = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [uploadState, setUploadState] = useState("idle"); // idle | uploading | done

  const validateAndSetFile = (selected) => {
    if (!selected) return;

    const ext = "." + selected.name.split(".").pop().toLowerCase();
    if (!ACCEPTED_TYPES.includes(ext)) {
      setError("Please upload a PDF or Word document (.pdf, .doc, .docx).");
      return;
    }
    if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File is too large. Max size is ${MAX_SIZE_MB}MB.`);
      return;
    }

    setError("");
    setFile(selected);
    setUploadState("idle");
  };

  const handleFileSelect = (e) => {
    validateAndSetFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSetFile(e.dataTransfer.files[0]);
  };

  const handleRemove = () => {
    setFile(null);
    setError("");
    setUploadState("idle");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUpload = () => {
    if (!file) return;
    setUploadState("uploading");

    // Placeholder — once Supabase Storage is wired up, this becomes
    // a real upload call. Simulated here so the UI flow is testable now.
    setTimeout(() => {
      setUploadState("done");
    }, 1400);
  };

  return (
    <div className="dashboard-wrapper">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          Mock<span>AI</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`sidebar-item ${item.path === "/resume" ? "sidebar-item-active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <Link to="/" className="sidebar-logout">
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        {/* Top Bar */}
        <div className="dashboard-topbar">
          <div>
            <h1 className="dashboard-welcome">Your Resume</h1>
            <p className="dashboard-date">
              Upload your resume to get personalized interview questions
            </p>
          </div>
        </div>

        <div className="resume-grid">

          {/* Upload Card */}
          <div className="dash-card">
            <div className="dash-card-header">
              <h3 className="dash-card-title">Upload Resume</h3>
            </div>

            {!file ? (
              <div
                className={`resume-dropzone ${isDragging ? "resume-dropzone-active" : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept={ACCEPTED_TYPES.join(",")}
                  onChange={handleFileSelect}
                  hidden
                />
                <div className="resume-dropzone-icon">
                  <UploadCloud size={28} color="#3B82F6" />
                </div>
                <p className="resume-dropzone-title">
                  Drag & drop your resume here
                </p>
                <p className="resume-dropzone-sub">
                  or click to browse — PDF, DOC, DOCX (max {MAX_SIZE_MB}MB)
                </p>
              </div>
            ) : (
              <div className="resume-file-card">
                <div className="resume-file-icon">
                  <File size={22} color="#3B82F6" />
                </div>
                <div className="resume-file-info">
                  <p className="resume-file-name">{file.name}</p>
                  <p className="resume-file-meta">{formatBytes(file.size)}</p>
                </div>

                {uploadState === "done" ? (
                  <span className="resume-status resume-status-done">
                    <CheckCircle2 size={16} />
                    Uploaded
                  </span>
                ) : (
                  <button className="resume-remove-btn" onClick={handleRemove}>
                    <X size={16} />
                  </button>
                )}
              </div>
            )}

            {error && <p className="resume-error">{error}</p>}

            {file && uploadState !== "done" && (
              <button
                className="start-btn resume-upload-btn"
                onClick={handleUpload}
                disabled={uploadState === "uploading"}
              >
                {uploadState === "uploading" ? (
                  <>
                    <span className="auth-loader" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadCloud size={16} />
                    Upload Resume
                  </>
                )}
              </button>
            )}

            {uploadState === "done" && (
              <p className="resume-success-note">
                Your resume is saved. New interviews will use it to generate
                personalized questions.
              </p>
            )}
          </div>

          {/* Info Card */}
          <div className="dash-card">
            <div className="dash-card-header">
              <h3 className="dash-card-title">
                <Sparkles size={16} color="#3B82F6" style={{ marginRight: 8, verticalAlign: "-3px" }} />
                Why upload your resume?
              </h3>
            </div>
            <ul className="resume-benefits-list">
              <li>Questions are tailored to your actual projects and skills</li>
              <li>Technical rounds focus on the stack you've actually used</li>
              <li>HR rounds reference your real experience, not generic prompts</li>
              <li>Your resume is private and only used to generate questions</li>
            </ul>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Resume;
