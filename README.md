# 🚀 AI → MCP → API Workflow Testing Collection (with Gemini 2.5 Flash)

This project demonstrates an end-to-end **Postman API testing workflow** for an internal AI agent that generates code snippets and DevOps configuration suggestions via an MCP server.  
It uses **Google Gemini** (free API) for dynamic AI responses and provides endpoints to simulate session handling, AI prompts, MCP operations, and validation.

---

## 📘 Features
- **Live AI responses** from Gemini
- **Session management** (`start`, `end`)
- **AI prompt handling** (`/api/query`)
- **MCP workflow simulation** (`/api/generate`, `/api/validate`)

- **Reusable Postman collection** for future automation & regression testing

- Includes **schema-based Postman tests** and **error-handling cases**


---

## ⚙️ Technologies
- **Node.js + Express** → REST API mock server  
- **Axios** → external Gemini API calls  
- **uuid** → unique session handling (for creating session id)  
- **dotenv** → environment variable management  
- **Postman** → API testing & automation  

---

## 🔑 Prerequisites
1. [Install Node.js](https://nodejs.org/en/download/)
2. [Sign up for Google AI Studio](https://aistudio.google.com/)
3. Create a **Gemini API key** →  
   [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

---

## 🧩 Installation

```bash
# Clone repository
git clone https://github.com/diviam021-bit/Postman-API-Testing-Collection.git
cd Postman-API-Testing-Collection

# Install dependencies
npm install


Create a .env file in the root directory:

GEMINI_API_KEY=your_gemini_api_key_here
PORT=4000

Start the server:

node server.js


🧩 How to Import in Postman
1️⃣ Import Collection

--  Open Postman

--  Click Import

--  Select
  postman/Agent-Api-Workflow-Collection-With-Testcases.postman_collection.json

2️⃣ Import Environment

--  Open Postman

--  Click Environments → Import

--  Select
  postman/Local Environment.postman_environment.json

3️⃣ Select Environment

--  Click Top-Right Environment dropdown

--  Choose: Local Environment

📚 API Documentation in Postman

-- Each request inside the collection already includes:

✅ Request descriptions

--  Explain:

--  Purpose of the request

--  Inputs required (e.g., session_id, prompt, task)

--  Expected behavior

You can view this via:

Click a request → Right side panel → Documentation

✅ Example request bodies

- - To help you quickly run and test.

✅ Response examples

- - Shows what the API should return.

✅ Test scripts

- - Every request has automated Postman tests including:

- - HTTP status validation

- - JSON schema validation

- - Field checks (session_id, output, message)

- - Error handling tests (invalid/missing session ID)