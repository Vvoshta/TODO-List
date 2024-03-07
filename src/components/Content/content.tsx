import React, { useState } from 'react';
import './content.scss';

export type Item = {
  id: number;
  text: string;
  completed: boolean;
};

const Content: React.FC<Item> = () => {
  const [tasks, setTasks] = useState<Item[]>([]);
  const [input, setInput] = useState<string>('');

  const handleToggle = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask: Item = { id: Date.now(), text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  return (
    <div className='content'>
      <form action='' onSubmit={handleSubmit}>
        <input
          className='input'
          type='text'
          placeholder='Мне нужно...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type='submit' hidden>
          Submit
        </button>
      </form>

      <div className='items'>
        {tasks.map((task) => (
          <div
            className={`items-task ${task.completed ? 'items-task_checked' : ''}`}
            key={task.id}
            onClick={() => handleToggle(task.id)}
          >
            <label>{task.text}</label>
            <input type='checkbox' checked={task.completed} onChange={() => handleToggle(task.id)} />
          </div>
        ))}
      </div>
      {tasks.length === 0 && (
        <div className='no-todo'>
          <p>Задач пока нет</p>
          <img src='../../../to-do-list-nothing.gif' alt='' />
        </div>
      )}
    </div>
  );
};

export default Content;
