const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const geminiAI = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

export default geminiAI;
