function AnswerCard({ question, answer, loading }) {
  if (!question) return null;

  return (
    <div className="answer-section">

      <div className="question-card">
        <div className="section-title">
          Question
        </div>

        <div className="question">
          <strong>{question}</strong>
        </div>
      </div>

      <div className="answer-card">
        <div className="section-title">
          Answer
        </div>

        {loading ? (
          <p>Generating answer...</p>
        ) : (
          <div className="answer">
            {answer}
          </div>
        )}
      </div>

    </div>
  );
}

export default AnswerCard;