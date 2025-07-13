import React, { useState } from "react";

function TodoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">📝 Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="px-4 py-2 rounded text-white"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md">
        {tasks.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-800 px-4 py-2 my-2 rounded"
          >
            {item}
            <button
              onClick={() => deleteTask(index)}
              className="text-red-400 hover:text-red-600"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
