// AlertButton.jsx
function AlertButton({ message, onClick }) {
  return (
    <button className="alert-button" onClick={() => onClick(message)}>
      Show Student Info
    </button>
  );
}

export default AlertButton;
