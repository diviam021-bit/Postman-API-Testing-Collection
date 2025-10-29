require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());

let sessions = {};
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 🔹 function: Call Gemini AI API
async function callGemini(prompt) {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
      }
    );

    const text =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    return "AI generation failed. Please try again.";
  }
}



//  Start a new user session
app.post("/api/session/start", (req, res) => {
  const session_id = uuidv4();
  sessions[session_id] = { created: new Date(), history: [] };

  res.json({
    session_id,
    message: "session started successfully,you can start AI communication",
  });
});

//  AI Query endpoint with static Question & Answers
app.post("/api/query", async(req, res) => {
 const { session_id, prompt } = req.body;
 if (!session_id || !sessions[session_id])
    return res.status(400).json({ error: "Invalid or missing session_id" });
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  const output = await callGemini(prompt);
  sessions[session_id].history.push({ role: "user", prompt, output });

  res.json({
    prompt,
    output,
    message: "AI-generated response from Gemini",
  });
});

//  Generate Code
app.post("/api/generate", async(req, res) => {
  const { session_id, task } = req.body;
  if (!session_id || !sessions[session_id])
    return res.status(400).json({ error: "Invalid or missing session_id" });
  if (!task) return res.status(400).json({ error: "Task is required" });

  const prompt = `Generate a DevOps configuration suggestion for: ${task}`;
  const output = await callGemini(prompt);

  sessions[session_id].history.push({ role: "mcp", task, output });

  res.json({
    task,
    output,
    message: "MCP-generated configuration suggestion",
  });
});


//  Validate generated configuration
app.post("/api/validate", (req, res) => {
  const { session_id, data } = req.body;
  if (!session_id || !sessions[session_id])
    return res.status(400).json({ error: "Invalid or missing session_id" });
  if (!data) return res.status(400).json({ error: "No data to validate" });

  const isValid = typeof data === "object" && Object.keys(data).length > 0;
  res.json({
    valid: isValid,
    message: isValid
      ? "MCP validation successful"
      : "MCP validation failed: data empty or invalid",
  });
});

//  End the user session
app.delete("/api/session/:id", (req, res) => {
  const { id } = req.params;
  if (!sessions[id]) return res.status(404).json({ error: "Session not found" });

  delete sessions[id];
  res.status(200).json({ message: "Session ended successfully" });
});

//  Start server
app.listen(PORT, () =>
  console.log(`API server running on http://localhost:${PORT}`)
);
