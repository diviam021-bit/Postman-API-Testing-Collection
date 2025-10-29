const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let sessions = {}; // Store session data in memory

// --- 1. Start a new session ---
app.post("/api/session/start", (req, res) => {
  const sessionId = "sess_" + Math.random().toString(36).substring(2, 10);
  sessions[sessionId] = { context: [] };
  res.json({
    session_id: sessionId,
    message: "session started successfully",
  });
});

// --- 2. AI Query endpoint ---
app.post("/api/query", (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "'prompt' field is missing" });
  }
  res.json({
    output: `Generated suggestions for: ${prompt}`,
  });
});

// --- 3. Generate Code ---
app.post("/api/generate", (req, res) => {
  const { session_id, task } = req.body;
  if (!session_id || !sessions[session_id])
    return res.status(401).json({ error: "'session_id' field is missing" });
  if (!task)
    return res.status(400).json({ error: "'task' field is missing" });

  sessions[session_id].context.push(task);
  res.status(200).json({
    output: `code or script generated for : ${task}`,
  });
});


// --- 4. Validate generated configuration ---
app.post("/api/validate", (req, res) => {
  const { config } = req.body;
  if (!config) return res.status(400).json({ error: "Missing 'config' field" });
  if (config.includes("error")) {
    return res.status(422).json({
      valid: false,
      message: "Invalid configuration syntax",
    });
  }

  res.json({ valid: true, message: "Configuration validated successfully" });
});

// --- 5. End the session ---
app.delete("/api/session/:id", (req, res) => {
  const { id } = req.params;
  if (!sessions[id]) return res.status(404).json({ error: "Session not found" });

  delete sessions[id];
  res.status(200).json({ message: "Session ended successfully" });
});

// --- Start server ---
app.listen(5000, () =>
  console.log("API server running on http://localhost:5000")
);
