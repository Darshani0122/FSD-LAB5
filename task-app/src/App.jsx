import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const addTask = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), text: text, done: false }
    ]);

    setText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (id) => {
    const value = prompt("Edit task:");

    if (value !== null && value.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: value } : task
        )
      );
    }
  };

  return (
    <div>
      <h2>Task App</h2>

      <form onSubmit={addTask}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add task"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />

            <span
              style={{
                textDecoration: task.done ? "line-through" : "none",
                marginLeft: "8px",
                marginRight: "8px"
              }}
            >
              {task.text}
            </span>

            <button onClick={() => startEdit(task.id)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;