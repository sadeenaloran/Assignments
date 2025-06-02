import AlertButton from "./AlertButton";

function StudentCard({ name, grade, onShowInfo }) {
  return (
    <div className="student-card">
      <h3>{name}</h3>
      <p>Grade: {grade}</p>
      <p>
        {grade >= 85 ? (
          <span className="excellent-badge">Excellent Student</span>
        ) : (
          <span className="needs-improvement-badge">Needs Improvement</span>
        )}
      </p>
      <AlertButton
        message={`Student: ${name} — Grade: ${grade}`}
        onClick={onShowInfo}
      />
    </div>
  );
}

export default StudentCard;
