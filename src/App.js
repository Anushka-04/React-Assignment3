import React from "react";
import "./App.css";
import TextField from '@material-ui/core/TextField/TextField';
import Button from "@material-ui/core/Button/Button";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

function Todo({ todo, index, completeTodo, removeTodo }) {
  let date = new Date();
  let time = date.getHours()+':'+date.getMinutes();
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : ""}}
    >
      {todo.text}
      <div style={{fontSize:14}}>{new Date().toDateString()}</div>
      <div style={{fontSize:14}}>{time}</div>
      <div>
        <Button onClick={() => completeTodo(index)}>Done</Button>
        <Button onClick={() => removeTodo(index)}><DeleteOutlinedIcon /></Button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    //e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    /*<form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>*/
    <div>
         <TextField id="name" variant="outlined" value={value} onChange={e=>setValue(e.target.value)}
        placeholder="Enter something" style={{width:550}}/>
        <Button onClick={() => handleSubmit()}>Add</Button>
        </div>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Do my assignments",
      isCompleted: false
    },
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
