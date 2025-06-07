// import Header from './components/header';
// import Footer from './components/footer';
// import Home from './components/Home';
// import './App.css'

// function App() {
//   return (
//     <div className='component'>
//       <Header />
//       <Home />
//       <Footer />
//     </div>
//   );
// }

// export default App;

// import TableData from "./main";

import Food from "./food";
import "./App.css";
 import Card from "./Card";

function App() {
  return (
<>
<Card name="Hussam" disc="This is a description of the card." age={30} isStaff={true} />
</>      
  )}

// function App() {
//   const col = [
//     { key: "id", lable: "Id" },
//     { key: "name", lable: "Name" },
//     { key: "email", lable: "Email" },
//     { key: "provider", lable: "Provider" },
//   ];
 
//   const users = [
//     {
//       id: 1,
//       name: "Hussam",
//       email: "test@test.com",
//       provider: "Google",
//     },
//     {
//       id: 2,
//       name: "Ali",
//       email: "Ali@test.com",
//       provider: "Google",
//     },
//   ];
//   const col2 = [
//     { key: "id", lable: "Id" },
//     { key: "name", lable: "Name" },
//   ];
//   const courses = [
//     { id: 1, name: "HTML" },
//     { id: 1, name: "CSS" },
//   ];
//   return (
//     <>
//       <TableData col={col} data={users} />
 
//       <TableData col={col2} data={courses} />
//     </>
//   );
// }
 
export default App;