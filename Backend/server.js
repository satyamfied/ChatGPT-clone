import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,

  baseURL: "https://openrouter.ai/api/v1",
});

const response = await client.responses.create({
  model: "openai/gpt-4o-mini",

  input: "Tell a joke about computer science",
});

console.log(response.output_text);