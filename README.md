
# tutor.me – Online Learning Platform Leveraging Generative AI

**Authors:** Kevin Hernandez Garcia, Julian Spindola  
**Course:** Artificial Intelligence, CSCI4313  
**Link:** [https://github.com/alke-14/tutor-me](https://github.com/alke-14/tutor-me)

---

## 📘 Introduction

The rapid advancement and adoption of Generative Artificial Intelligence (Gen-AI) technologies has transformed countless industries. According to National University, 77% of companies are actively using or exploring AI. The education sector is no exception, with students increasingly turning to tools like ChatGPT and Google Gemini to supplement their learning.

While these tools are effective, they often fail to personalize responses based on a user’s learning preferences or cognitive needs — unless that context is explicitly provided in the prompt. Our goal with **tutor.me** was to improve that experience by integrating learning style and disability awareness into the tutoring process automatically.

---

## 📚 Related Work

- Adelana, O. P., & Akinyemi, A. L. (2021). [AI-Based Tutoring Systems Utilization for Learning](https://unijerps.org/index.php/unijerps/article/view/193/167) – UNIJERPS.
- Hemachandran, K. et al. (2022). [AI to Augment Tutoring in Higher Education](https://doi.org/10.1155/2022/1410448) – Computational Intelligence and Neuroscience.
- Lin, C.-C. et al. (2023). [AI in Intelligent Tutoring Systems for Sustainable Education](https://link.springer.com/article/10.1186/s40561-023-00260-y) – SpringerLink.

---

## ⚙️ Method

Our project is a full-stack web application built using:

- **Frontend:** React + TypeScript
- **Backend:** Express (Node.js)
- **AI Integration:** Google Gemini 2.5 Flash Model (via API)

### 🧠 Core Workflow

1. **Landing Page:** Entry point for users.
2. **Onboarding Form:** Captures learning styles and disability disclosures.
3. **Chatbox Interface:** Allows natural conversation with Gemini AI, powered by user-specific context.

User preferences are stored in local storage and passed as `systemInstruction` to every AI query to personalize responses.

---

## 💡 Example Prompt Logic (Gemini API)

```ts
systemInstruction: [
  {
    text: `You are a tutor who has expertise on everything you are asked for and is willing to PRIMARILY TEACH and HELP. You must meet the needs defined by the user: ${storedData}`,
  },
];
```

Each user prompt is appended to a history string to simulate memory during chat sessions, and complex content (e.g. LaTeX) is supported in AI replies.

---

## 🚀 Result

After multiple testing cycles, we established an effective `systemInstruction` to simulate a tutor’s behavior. The conversation memory improves follow-up responses, and the Gemini API performs reliably with large responses and contextual memory enabled.

---

## 💬 Chatbot Logic Snippet

```tsx
const sendMessage = async () => {
  if (!input.trim()) return;
  const userMessage: Message = { role: "user", text: input };
  const updatedMessages = [...messages, userMessage];
  setMessages(updatedMessages);
  setLoading(true);
  setInput("");

  try {
    const conversationText = updatedMessages
      .map((m) => `${m.role === "user" ? "User" : "Tutor"}: ${m.text}`)
      .join("\n");

    const reply = await query(conversationText);
    const aiMessage: Message = { role: "ai", text: reply ?? "" };
    setMessages((prev) => [...prev, aiMessage]);
  } catch (err) {
    console.error(err);
    setMessages((prev) => [...prev, { role: "ai", text: "Error fetching reply" }]);
  } finally {
    setLoading(false);
  }
};
```

---

## 🔐 Deployment & Security Considerations

To securely use the Gemini API:

- **The API key must not be exposed in the frontend.**
- We created a secure Express server to proxy Gemini requests.
- The key is stored in `.env` and accessed via `process.env.GEMINI_API_KEY`.
---

## ✅ Features

- Personalized tutoring experience
- Google Gemini 2.5 Flash integration
- Onboarding for learning styles/disabilities
- Secure backend proxy
- LaTeX rendering support
- Modular React architecture

---

## 🛠 Future Work

- Implement `React Hook Form` for validation and cleaner form logic
- Store previous chats (conversation history)
- UI polish and accessibility improvements
- Add student progress tracking or dashboard features

---

## 🧾 Appendix I – API Source Code Sample

```ts
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
if (!apiKey) throw new Error("Missing API key");

const ai = new GoogleGenAI({ apiKey });
const storedData = localStorage.getItem("userData");

export const query = async (q: string) => {
  const config = {
    maxOutputTokens: 30000,
    thinkingConfig: { thinkingBudget: 0 },
    responseMimeType: "text/plain",
    systemInstruction: [
      {
        text: `You are a tutor who has expertise on everything you are asked for and is willing to PRIMARILY TEACH and HELP. You must meet the needs defined by the user: ${storedData}`,
      },
    ],
  };

  const contents = [
    {
      role: "user",
      parts: [{ text: q }],
    },
  ];

  const response = await ai.models.generateContent({ model: "gemini-2.5-flash", config, contents });
  return response.text ?? "";
};
```

---

## 🔗 Repository

View full source code and structure at:  
👉 **[https://github.com/alke-14/tutor-me](https://github.com/alke-14/tutor-me)**
