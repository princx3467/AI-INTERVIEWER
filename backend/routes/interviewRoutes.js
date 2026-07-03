const express = require("express");
const router = express.Router();
const {
  saveInterview,
  getInterviews,
  getInterview,
  parseResume,
  upload,
} = require("../controllers/interviewController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, saveInterview);
router.get("/", protect, getInterviews);
router.get("/:id", protect, getInterview);
router.post("/resume", protect, upload.single("resume"), parseResume);

module.exports = router;