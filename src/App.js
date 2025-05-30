import { useState } from 'react';
import backgroundImage from './bg.jpg'; 

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() !== '') {
      const newTodo = {
        text: input.trim(),
        completed: false,
        timestamp: new Date().toLocaleString(),
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-90 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-blue-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-800 mb-6 sm:mb-8 drop-shadow">
          📝 To Do List
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What do you need to do?"
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="text-gray-400 text-center italic">No tasks yet. Start adding!</p>
        ) : (
          <div className="max-h-64 overflow-y-auto pr-1 space-y-4">
            <ul className="space-y-4">
              {todos.map((todo, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-blue-50 px-4 py-3 rounded-xl shadow-sm hover:bg-blue-100 transition"
                >
                  <label className="flex items-start gap-3 cursor-pointer w-full sm:w-auto">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(index)}
                      className="form-checkbox h-5 w-5 mt-1 text-blue-600"
                    />
                    <div>
                      <span
                        className={`block text-base sm:text-lg ${
                          todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                        }`}
                      >
                        {todo.text}
                      </span>
                      <p className="text-xs text-gray-500">{todo.timestamp}</p>
                    </div>
                  </label>
                  <button
                    onClick={() => removeTodo(index)}
                    className="text-red-500 hover:text-red-700 font-bold text-xl mt-2 sm:mt-0 sm:ml-4"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
