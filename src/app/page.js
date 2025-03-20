"use client";

import { createContext, useRef, useState } from "react";
import { TodoProvider } from "./(components)/todoContext";
import Header from "./(components)/header";
import TodoForm from "./(components)/form";
import TodoList from "./(components)/list";

export const ThemeContext = createContext(null);

export default function Home() {
  const [theme, setTheme] = useState("light");
  const addInputRef = useRef(null);

  function ToggleTheme(){
    if(theme === 'light')
      setTheme('dark')
    else
      setTheme('light')
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`w-full min-h-screen px-32 py-10 flex flex-col items-center space-y-5 ${(theme === 'light') ? 'bg-amber-50' : 'bg-amber-900'}`}>
        <Header handleTheme={ToggleTheme}/>
        <TodoProvider>
          <TodoForm ref={addInputRef} />
          <TodoList inputRef={addInputRef} />
        </TodoProvider>
      </div>
    </ThemeContext.Provider>
  );
}
