import StudentCard from "./StudentCard";

function StudentList({ students, onShowInfo }) {
  return (
    <div>
      {students.map((student) => (
        <StudentCard
          key={student.id}
          name={student.name}
          grade={student.grade}
          onShowInfo={onShowInfo}
        />
      ))}
    </div>
  );
}

export default StudentList;
