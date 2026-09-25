import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY

});

const response = await client.responses.create({
  model: "openai.gpt-oss-120b",
  input: [
    {
      role: "user",
      content: "Write a one-sentence bedtime story about a unicorn."
    }
  ]
});
  console.log(apiKey);
console.log(response.output_text);