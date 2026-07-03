import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Code, Users, Layers, ArrowRight, FileText, X } from "lucide-react";
import { uploadResume } from "../api";

const roles = [
  { label: "Frontend", icon: <Code size={18} /> },
  { label: "Backend", icon: <Layers size={18} /> },
  { label: "Fullstack", icon: <Layers size={18} /> },
  { label: "HR Round", icon: <Users size={18} /> },
];

const difficulties = [
  { label: "Easy", color: "#22C55E" },
  { label: "Medium", color: "#F59E0B" },
  { label: "Hard", color: "#EF4444" },
];

const types = [
  { label: "Technical" },
  { label: "HR" },
  { label: "Mixed" },
];

const Interview = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const isReady = selectedRole && selectedDifficulty && selectedType;

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setUploadError("Please upload a PDF file only");
      return;
    }

    setResumeFile(file);
    setUploading(true);
    setUploadError("");

    try {
      const token = localStorage.getItem("token");
      const data = await uploadResume(file, token);
      setResumeText(data.resumeText);
    } catch (err) {
      setUploadError("Failed to parse resume. Try again.");
      setResumeFile(null);
    } finally {
      setUploading(false);
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    setResumeText("");
    setUploadError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleStart = () => {
    if (isReady) {
      navigate("/session", {
        state: {
          role: selectedRole,
          difficulty: selectedDifficulty,
          type: selectedType,
          resumeText: resumeText,
        },
      });
    }
  };

  return (
    <div className="interview-page">
      <div className="interview-glow" />

      <div className="interview-header">
        <div
          className="auth-logo"
          onClick={() => navigate("/dashboard")}
          style={{ cursor: "pointer" }}
        >
          Mock<span>AI</span>
        </div>
      </div>

      <div className="interview-content">

        <div className="interview-title-section">
          <p className="section-label">New Interview</p>
          <h2 className="interview-title">
            Set Up Your <span className="hero-gradient">Mock Interview</span>
          </h2>
          <p className="interview-subtitle">
            Choose your role, difficulty and type to get started.
          </p>
        </div>

        <div className="interview-card">

          {/* Role */}
          <div className="toggle-section">
            <label className="toggle-label">
              <Mic size={16} color="#A855F7" />
              Select Role
            </label>
            <div className="toggle-group">
              {roles.map((role) => (
                <button
                  key={role.label}
                  className={`toggle-btn ${selectedRole === role.label ? "toggle-btn-active" : ""}`}
                  onClick={() => setSelectedRole(role.label)}
                >
                  {role.icon}
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          <div className="toggle-divider" />

          {/* Difficulty */}
          <div className="toggle-section">
            <label className="toggle-label">
              <Layers size={16} color="#A855F7" />
              Select Difficulty
            </label>
            <div className="toggle-group">
              {difficulties.map((diff) => (
                <button
                  key={diff.label}
                  className={`toggle-btn ${selectedDifficulty === diff.label ? "toggle-btn-active" : ""}`}
                  style={
                    selectedDifficulty === diff.label
                      ? {
                          borderColor: diff.color,
                          color: diff.color,
                          background: `${diff.color}15`,
                        }
                      : {}
                  }
                  onClick={() => setSelectedDifficulty(diff.label)}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          <div className="toggle-divider" />

          {/* Type */}
          <div className="toggle-section">
            <label className="toggle-label">
              <Users size={16} color="#A855F7" />
              Select Type
            </label>
            <div className="toggle-group">
              {types.map((type) => (
                <button
                  key={type.label}
                  className={`toggle-btn ${selectedType === type.label ? "toggle-btn-active" : ""}`}
                  onClick={() => setSelectedType(type.label)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="toggle-divider" />

          {/* Resume Upload */}
          <div className="toggle-section">
            <label className="toggle-label">
              <FileText size={16} color="#A855F7" />
              Upload Resume (Optional)
            </label>

            {!resumeFile ? (
              <div
                className="resume-upload-box"
                onClick={() => fileInputRef.current.click()}
              >
                <FileText size={24} color="#6B6B8A" />
                <p className="resume-upload-text">
                  Click to upload PDF resume
                </p>
                <p className="resume-upload-sub">
                  AI will generate personalized questions
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  style={{ display: "none" }}
                />
              </div>
            ) : (
              <div className="resume-uploaded">
                <div className="resume-file-info">
                  <FileText size={18} color="#A855F7" />
                  <span className="resume-file-name">{resumeFile.name}</span>
                  {uploading && (
                    <span className="resume-uploading">Parsing...</span>
                  )}
                  {!uploading && resumeText && (
                    <span className="resume-success">✅ Ready</span>
                  )}
                </div>
                <button className="resume-remove-btn" onClick={removeResume}>
                  <X size={16} />
                </button>
              </div>
            )}

            {uploadError && (
              <p className="resume-error">{uploadError}</p>
            )}
          </div>

          <div className="toggle-divider" />

          {/* Summary */}
          {isReady && (
            <div className="interview-summary">
              <p className="summary-text">
                You are about to start a{" "}
                <span>{selectedDifficulty}</span> level{" "}
                <span>{selectedType}</span> interview for{" "}
                <span>{selectedRole}</span> role.
                {resumeText && (
                  <span> Your resume will be used for personalized questions.</span>
                )}
              </p>
            </div>
          )}

          {/* Start Button */}
          <button
            className={`interview-start-btn ${isReady ? "interview-start-btn-ready" : ""}`}
            onClick={handleStart}
            disabled={!isReady || uploading}
          >
            <Mic size={18} />
            {isReady ? "Start Interview Now" : "Select all options to start"}
            {isReady && <ArrowRight size={18} />}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Interview;