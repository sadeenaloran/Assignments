function NewToDO () {
    return (
        <div className="new-todo">
            <h2>New To-Do</h2>
            <form>
                <label htmlFor="">Title</label>               
                <br />
                 <input type="text" placeholder="Enter new title" />
                <br />
                <label htmlFor="">Description</label>
                <br />
                 <input type="text" placeholder="Enter new description" />
                <br />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}
export default NewToDO;