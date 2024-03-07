import React, { useState } from "react";
import "./content.scss";
import nothing from './nothing.jpeg';

export type Item = {
  id: number;
  text: string;
  completed: boolean;
};

export const Content: React.FC<Item> = () => {
  const [tasks, setTasks] = useState<Item[]>([]);
  const [input, setInput] = useState("");

  const handleToggle = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    const newTask: Item = { id: Date.now(), text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="content">
      <div>
        <input
          className="input"
          type="text"
          placeholder="Мне нужно..."
          value={input}
          onChange={handleChangeInput}
          onKeyDown={handleKeyPress}
        />

        <button type="submit" hidden>
          Submit
        </button>
      </div>

      <div className="items">
        {tasks.map((task) => (
          <div
            className={`items-task ${task.completed ? "items-task_checked" : ""}`}
            key={task.id}
            onClick={() => handleToggle(task.id)}
          >
            <label>{task.text}</label>
            <input type="checkbox" checked={task.completed} />
          </div>
        ))}
      </div>
      {tasks.length === 0 && (
        <div className="no-todo">
          <p>Задач пока нет</p>
          <img src={nothing} alt="Nothing to do" />
        </div>
      )}
    </div>
  );
};
