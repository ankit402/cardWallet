import express from "express";
import cors from "cors";
import OpenAI from "openai";
import "dotenv/config";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Amazon Bedrock configuration
const region = process.env.AWS_REGION || "us-east-1";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: `https://bedrock-runtime.${region}.amazonaws.com/openai/v1`,
  //https://bedrock-mantle.us-east-1.api.aws/v1
});

// Test API
app.get("/", (req, res) => {
  res.json({
    message: "Bedrock Node.js API is running",
  });
});

// Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const completion = await client.chat.completions.create({
      model: "openai.gpt-oss-120b-1:0",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const answer = completion.choices[0].message.content;

    res.json({
      answer,
    });
  } catch (error) {
    console.error("Bedrock call failed:");
    console.error(error);

    res.status(500).json({
      error: "Failed to get response from Bedrock",
      details: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Bedrock API server running at http://localhost:${PORT}`);
});