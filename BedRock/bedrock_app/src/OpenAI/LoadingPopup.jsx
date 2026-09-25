function LoadingPopup({ show }) {
  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-popup">
        <div className="loader"></div>

        <h3>Thinking...</h3>
        <p>AI is processing your question</p>
      </div>
    </div>
  );
}

export default LoadingPopup;