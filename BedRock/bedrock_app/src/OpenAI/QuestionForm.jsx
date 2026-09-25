import { useState } from "react";

function QuestionForm({ onAsk, loading }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    onAsk(question);
    setQuestion("");
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <label htmlFor="question">
        Ask your question
      </label>

      <textarea
        id="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        rows="4"
        disabled={loading}
      />

      <button type="submit" disabled={loading || !question.trim()}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>
    </form>
  );
}

export default QuestionForm;