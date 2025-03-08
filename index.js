require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows requests from your CLI
app.use(express.json());

// Secure API route
app.get("/api-key", (req, res) => {
  const authHeader = req.headers.authorization;

  console.log('authHeader: ' + authHeader);
  console.log('secret: ' + process.env.SERVER_SECRET);

  if (!authHeader || authHeader !== `Bearer ${process.env.SERVER_SECRET}`) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  res.json({ apiKey: process.env.OPENAI_API_KEY });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ API Key Server running on http://localhost:${PORT}`);
});
