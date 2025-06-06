import  "./App.css";
// import Card from "./Card/Card";
// import Food from "./Card/food";     
// import List from "./Card/List";
import TableData from "./TableData";
function App() {

    //  const food= [{id:1, name:"Pizza", type:'italy'}, {id:2, name:"Burger", type:'italy'}, {id:3, name:"Pasta", type:'italy'}, {id:4, name:"Salad", type:'italy'},{id:5, name:"Sushi", type:'italy'}];
    // const veganFood = [{id:1, name:"Salad", type:'vegan'}, {id:2, name:"Sushi", type:'vegan'}, {id:3, name:"Pasta", type:'vegan'}];
    
    const col = [
        // must be the key of colum unique
        { key: "id", label: "Id" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "provider", label: "Provider" },
    ];

    const users = [
        {
            id: 1,
            name: "Hussam",
            email: "test@test.com",
            provider: "Google",
        },
          {
            id: 2,
            name: "ali",
            email: "ali@test.com",
            provider: "Google",
        },
    ]
 const courses = [
        { id: 1, name: "HTML" },
        { id: 2, name: "CSS" },
    ];
    const col2 = [
        { key: "id", label: "Id" },
        { key: "name", label: "Name" },
    ];
  return (
    <>
      {/* <Card name="Hussam" disc="This is a description of the card." age={30} isStaff={true} />
      <Food />
      <List items={food} />
        <List items={veganFood} /> */}
        <TableData col={col} data={users} />
        <TableData col={col2} data={courses} />     
        <TableData col={col} data={users} />
        <TableData col={col2} data={courses} />
    </>
  );
}