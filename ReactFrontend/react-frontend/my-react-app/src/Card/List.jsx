function List({items=[]}){

    food.sort((a, b) => a.name.localeCompare(b.b));
    
    const foodList = food.map((p)=> <li key={p.name}>{p.name}</li>);
    const veganFoodList = veganFood.map((p)=> <li key={p.id}>{p.name}</li>);
    return (<>
    <ul> {foodList} </ul>
    <ul> {veganFoodList} </ul>
    </>);
    
}
export default List;