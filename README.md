# 🧠 AI → MCP → API Workflow Testing (Node.js + Postman)

This project provides a **Postman API Testing Collection** and a **Node.js mock server** to simulate an internal **AI → MCP → API workflow**.  
The goal is to validate API responses, error handling, and session/context management for AI-driven DevOps automation.

---

## 🚀 Features

- Mock API built with **Node.js + Express**

- **5 Core Endpoints** covering AI and MCP interactions
- Postman tests for:
  - ✅ Valid Requests
  - ❌ Invalid Requests
  - 🔄 Session Handling
  - 🧩 Edge Cases (including missing `session_id`)
- Reusable Postman environment setup

---


## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/ai-mcp-api-tests.git
cd ai-mcp-api-tests

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Run the Mock API Server
npm start

###  Postman Setup
1️⃣ Import Files into Postman

Go to Postman → File → Import and import:

- postman/Agent-Api-Workflow-Collection.postman_collection.json

- postman/Local Environment.postman_environment.json

-- For each Request, Documentation added in Postman.



