import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { TodoDispatchContext } from "./todoContext";
import { ThemeContext } from "../page";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TodoItem({ todo, inputRef }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const theme = useContext(ThemeContext);
  const dispatch = useContext(TodoDispatchContext);

  const handleCheckedTodo = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({ type: "updateTodo", id });
  };

  const handleDeleteTodo = (e, id) => {
    e.stopPropagation();
    console.log("Deleting item:", id);
    dispatch({ type: "deleteTodo", id });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`w-full rounded-2xl p-2 ${
        theme === "light"
          ? "bg-amber-100 text-amber-800 border-amber-800"
          : "bg-amber-800 text-amber-100 border-amber-100"
      } border-2 flex justify-between items-center`}
    >
      <div className="flex space-x-3 sm:w-full w-4/5">
        <div {...attributes} {...listeners} className="cursor-grab p-2">
          <FontAwesomeIcon icon={faBars} className="w-[15px] opacity-50 action-none" />
        </div>

        <label
          className="flex w-full items-center space-x-2 cursor-pointer overflow-hidden"
          onClick={(e) => handleCheckedTodo(e, todo.id)}
        >
          <input type="checkbox" className="hidden" />
          <span
            className={`min-w-10 h-10 flex items-center justify-center rounded-full border-amber-800 ${
              theme === "light"
                ? todo.completed
                  ? "bg-amber-800 text-amber-100"
                  : "bg-amber-50"
                : todo.completed
                ? "bg-amber-100 text-amber-700"
                : "bg-amber-700"
            }`}
          >
            <FontAwesomeIcon
              icon={faCheck}
              className={`w-[15px] ${
                theme === "light" ? "text-amber-50" : "text-amber-700"
              }`}
            />
          </span>
          <p title={todo.text}>{todo.text}</p>
        </label>
      </div>
      <button
        className="w-10 h-full cursor-pointer"
        onClick={(e) => handleDeleteTodo(e, todo.id)}
      >
        <FontAwesomeIcon icon={faXmark} className="w-[20px]" />
      </button>
    </div>
  );
}
