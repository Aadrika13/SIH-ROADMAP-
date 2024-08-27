require("dotenv/config");
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "If the user asks for a roadmap on any subject, respond with a detailed list of topics for that subject, each with a brief description. The format should be consistent across all subjects.\n\nRoadmap Format:\n\n[Topic 1]\n\nDescription: [Brief description of Topic 1 in 10 words]\n[Topic 2]\n\nDescription: [Brief description of Topic 2 in 10 words]\n[Topic 3]\n\nDescription: [Brief description of Topic 3 in 10 words]\n...\n\nExample for a Java roadmap:\n\nIntroduction to Java\n\nDescription: Overview of Java’s history and key features.\nBasics of Java Programming\n\nDescription: Fundamental concepts like syntax, variables, and operators.\nIf the user asks anything unrelated to a roadmap: Respond with: \"I'm sorry, I'm not able to assist with that.\""},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, I understand. Please tell me the subject you would like a roadmap for. I will provide a detailed list of topics and descriptions in the format you provided. \n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

// run();
module.exports = run