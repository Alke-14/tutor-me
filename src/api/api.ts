import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

// Define AI object that we will use to interact with Gemini's API
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

if (!apiKey) {
  console.error(
    "API key is missing. Ensure GOOGLE_API_KEY is set in your environment variables."
  );
  throw new Error("Missing API key");
}

const ai = new GoogleGenAI({ apiKey });

// Define userData variable - the results of the onboarding form
const storedData = localStorage.getItem("userData");

export const query = async (q: string) => {
  console.log(`Query received: ${q}`);
  // define settings
  const config = {
    // limits response size. can be changed
    maxOutputTokens: 30000,

    // do NOT let it think... costs too much money
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: "text/plain",

    // pass in to the system the user's data from form
    systemInstruction: [
      {
        text: `You are a tutor. To verify you can see this, prefix every message with Tutor. You must meet the needs defined by the user: ${storedData}`,
      },
    ],
  };

  //define model
  const model = "gemini-2.5-flash";

  //define contents of message, enter user query as prompt
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: q,
        },
      ],
    },
  ];

  // generate response given variables above
  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  return response.text;
};
