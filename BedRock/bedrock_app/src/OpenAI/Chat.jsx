import { useState } from "react";
import QuestionForm from "./QuestionForm";
import AnswerCard from "./AnswerCard";
import "./CSS/Chat.css";
import { writeFile } from 'node:fs/promises';

function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async (userQuestion) => {
    setQuestion(userQuestion);
    setAnswer("");
    setLoading(true);
  

    const payload = {
      primaryText: 'Summer Gala',
      headerLabelRight: 'Admit One',
      backgroundColor: '#0F1219',
      thumbnailURL: 'https://cdn.example.com/passes/gala.png',
      barcode: { format: 'qr', message: 'https://example.com/tickets/12345' },
    };
    
    const response = await fetch('https://app.addpass.io/api/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_KEY_HERE',
        'Content-Type': 'application/json',
        'Accept': 'application/pkpass',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error('Generation failed');
    }
    
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile('summer-gala.pkpass', buffer);
    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userQuestion,
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
       
            const cleanAnswer = data.answer
        .replace(/<\/?reasoning>/gi, "")
        .trim();

        setAnswer(cleanAnswer);
    } catch (error) {
      console.error(error);
      setAnswer("Something went wrong while getting the AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">

      <header className="chat-header">
        <h1>AI Assistant</h1>
        <p>Ask a question and get an AI-powered answer.</p>
      </header>

      <QuestionForm
        onAsk={askAI}
        loading={loading}
      />

      <AnswerCard
        question={question}
        answer={answer}
        loading={loading}
      />

    </div>
  );
}

export default Chat;