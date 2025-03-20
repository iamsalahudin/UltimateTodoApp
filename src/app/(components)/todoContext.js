import { createContext, useReducer, useEffect } from "react";

export const TodoContext = createContext(null);
export const TodoDispatchContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todosReducer, []);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      dispatch({
        type: "fetchTodos",
        savedTodos: savedTodos,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  );
}

function todosReducer(todos, action) {
  switch (action.type) {
    case "fetchTodos": {
      return action.savedTodos;
    }
    case "UpdateTodos": {
      return action.updatedTodos;
    }
    case "addTodo": {
      return [
        ...todos,
        {
          id: Date.now(),
          text: action.text,
          completed: false,
        },
      ];
    }
    case "deleteTodo": {
      return todos.filter((todo) => todo.id !== action.id);
    }
    case "updateTodo": {
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    }
  }
}
