import { useContext } from "react";
import { TodoDispatchContext } from "./todoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../page";

export default function TodoForm({ ref }) {
  const dispatch = useContext(TodoDispatchContext);
  const theme = useContext(ThemeContext);
  const addTodo = (e) => {
    const text = ref.current.value;
    console.log(text)
    e.preventDefault();
    if (text.trim() === "") {
      return;
    }
    dispatch({
      type: "addTodo",
      text: text,
    });
    ref.current.value = '';
  };

  return (
    <form
      className={`md:w-1/2 w-full text-3xl ${(theme === 'light') ? 'text-amber-800 bg-amber-100' : 'bg-amber-800 text-amber-100'} font-bold p-5 rounded-2xl flex justify-between items-center`}
      onSubmit={addTodo}
    >
      <input
        type="text"
        className="outline-none w-full"
        ref={ref}
        onChange={(e) => (ref.current.value = e.target.value)}
      />
      <button type="submit" className="w-10 h-full cursor-pointer">
        <FontAwesomeIcon icon={faPlus} className="w-[30px]" />
      </button>
    </form>
  );
}
