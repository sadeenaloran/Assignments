// function Food() {
//     const food= ["Pizza", "Burger", "Pasta", "Salad", "Sushi"];
//   const foodList = food.map((p)=> <li>{p}</li>);
//     return (
//     <ul>
//         {/* <li>{food[0]}</li>
//         <li>{food[1]}</li> */}
//         {foodList}
//     </ul>
//   );
// }

function Food() {
    const food= [{id:1, name:"Pizza", type:'italy'}, {id:2, name:"Burger", type:'italy'}, {id:3, name:"Pasta", type:'italy'}, {id:4, name:"Salad", type:'italy'},{id:5, name:"Sushi", type:'italy'}];
    const veganFood = [{id:1, name:"Salad", type:'vegan'}, {id:2, name:"Sushi", type:'vegan'}, {id:3, name:"Pasta", type:'vegan'}];
    
    food.sort((a, b) => a.name.localeCompare(b.b));
    
    const foodList = food.map((p)=> <li key={p.name}>{p.name}</li>);
    const veganFoodList = veganFood.map((p)=> <li key={p.id}>{p.name}</li>);
    return (<>
    <ul> {foodList} </ul>
    <ul> {veganFoodList} </ul>
    </>);
    
  // const food= ["Pizza", "Burger", "Pasta", "Salad", "Sushi"];
  // const foodList = food.map((p)=> <li>{p}</li>);
  //   return (
  //   <ul>
  //       {/* <li>{food[0]}</li>
  //       <li>{food[1]}</li> */}
  //       {foodList}
  //   </ul>
  // );
}
export default Food;