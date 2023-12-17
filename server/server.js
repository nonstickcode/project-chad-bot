// server.js
import express from "express";
import { config } from "dotenv";
import { OpenAI } from "openai";
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' // Allow only the React app to access
}));


config(); // Load environment variables


app.use(express.json()); // For parsing application/json

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_MY_API_KEY,
});

console.log(process.env.REACT_APP_MY_API_KEY);
console.log(openai); // Check the openai object


app.post("/api/chat", async (req, res) => {
  try {
    const input = req.body.message;
    console.log("User Input:", input);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });

    console.log("API Response:", response);

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
