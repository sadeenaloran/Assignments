import { useState } from "react";
import StudentList from "./components/StudentList";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [students] = useState([
    { id: 1, name: "Sarah Ali", grade: 95 },
    { id: 2, name: "Omar Tarek", grade: 82 },
    { id: 3, name: "Lina Haddad", grade: 76 },
  ]);

  const handleShowInfo = (message) => {
    alert(message);
  };

  return (
    <div className="app-container">
      <h1>Student Dashboard</h1>
      <StudentList students={students} onShowInfo={handleShowInfo} />
      <Footer count={students.length} />
    </div>
  );
}

export default App;
