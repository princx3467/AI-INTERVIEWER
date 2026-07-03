const pool = require("../config/db");

// Save interview
const saveInterview = async (req, res) => {
  const { role, difficulty, type, duration, transcript, scores } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `INSERT INTO interviews 
        (user_id, role, difficulty, type, duration, transcript, scores)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        userId,
        role,
        difficulty,
        type,
        duration,
        JSON.stringify(transcript),
        JSON.stringify(scores),
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Save interview error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all interviews for user
const getInterviews = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM interviews WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Get interviews error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single interview
const getInterview = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT * FROM interviews WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const pdfParse = require("pdf-parse");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Parse resume and generate questions
const parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    res.json({ resumeText });
  } catch (error) {
    console.error("Resume parse error:", error);
    res.status(500).json({ message: "Failed to parse resume" });
  }
};

module.exports = {
  saveInterview,
  getInterviews,
  getInterview,
  parseResume,
  upload,
};

module.exports = { saveInterview, getInterviews, getInterview };