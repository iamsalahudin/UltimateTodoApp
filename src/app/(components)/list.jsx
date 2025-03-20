"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import TodoItem from "./item";
import { TodoContext, TodoDispatchContext } from "./todoContext";
import { ThemeContext } from "../page";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function TodoList({ inputRef }) {
  const searchRef = useRef(null);
  const theme = useContext(ThemeContext);
  const gotTodos = useContext(TodoContext);
  const dispatch = useContext(TodoDispatchContext);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [filteredTodos, setFilteredTodos] = useState(gotTodos);
  const [updatedTodos, setUpdatedTodos] = useState(gotTodos);
  const [searchValue, setSearchValue] = useState("");
  const filters = [
    { id: 0, type: "All" },
    { id: 1, type: "Completed" },
    { id: 2, type: "Pending" },
    { id: 3, type: "Search" },
  ];

  function handleFilter(type) {
    let filteredTodos = gotTodos; // gotTodos as base
    switch (type) {
      case "All": {
        setSelectedFilter(0);
        setSearchValue("");
        break;
      }
      case "Completed": {
        filteredTodos = gotTodos.filter((todo) => todo.completed === true);
        setSelectedFilter(1);
        setSearchValue("");
        break;
      }
      case "Pending": {
        filteredTodos = gotTodos.filter((todo) => todo.completed !== true);
        setSelectedFilter(2);
        setSearchValue("");
        break;
      }
      case "Search": {
        filteredTodos = handleSearch();
        setSelectedFilter(3);
        searchRef.current.querySelector("input").focus();
        break;
      }
      default:
        setSelectedFilter(0);
    }
    setFilteredTodos(filteredTodos);
  }

  const handleSearch = () => {
    let value = gotTodos.filter((todo) =>
      todo.text.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredTodos(value);
    return value;
  };

  const getTodoPos = (id, currentTodos) =>
    currentTodos.findIndex((task) => task.id === id);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over) return;
    if (active.id === over.id) return;
    console.log("Before Drag", filteredTodos);
    setFilteredTodos((todos) => {
      const posNow = getTodoPos(active.id, todos);
      const posNew = getTodoPos(over.id, todos);
      if (posNow !== -1 && posNew !== -1) {
        const newTodos = arrayMove(todos, posNow, posNew);
        setUpdatedTodos(newTodos);
        return newTodos;
      } else {
        return todos;
      }
    })
  };

  useEffect(() => {
    if (updatedTodos) {
      console.log('filter' + filteredTodos);
      console.log('update' + updatedTodos);
      dispatch({
        type: "UpdateTodos",
        updatedTodos: updatedTodos,
      });
    }
  }, [updatedTodos]);

  useEffect(() => {
    handleFilter(filters.find((filter) => filter.id === selectedFilter).type);
  }, [gotTodos, selectedFilter]);

  useEffect(() => {
    handleSearch();
  }, [searchValue]);
  return (
    <>
      <div className="flex items-center space-x-2">
        {filters.map((filter) => (
          <FilterBox
            theme={theme}
            data={filter.type}
            key={filter.id}
            handleClick={() => handleFilter(filter.type)}
            isSelected={filter.id == selectedFilter}
          />
        ))}
      </div>
      <div
        className={`md:w-1/2 w-full text-xl ${
          theme === "light"
            ? "text-amber-800 bg-amber-100"
            : "bg-amber-800 text-amber-100"
        } font-bold p-5 rounded-2xl ${
          selectedFilter === 3 ? "flex" : "hidden"
        } justify-between items-center`}
        ref={searchRef}
      >
        <input
          type="text"
          className="outline-none w-full"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div
        className={`md:w-1/2 w-full text-lg ${
          theme === "light"
            ? "text-amber-800 bg-amber-100"
            : "bg-amber-800 text-amber-100"
        } p-5 rounded-2xl flex flex-col items-center space-y-2`}
      >
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={filteredTodos.map((todo) => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} inputRef={inputRef} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
}

function FilterBox({ data, isSelected, handleClick, theme }) {
  return (
    <div
      className={`rounded-2xl p-2 cursor-pointer ${
        theme === "light"
          ? isSelected
            ? "text-amber-100 bg-amber-800"
            : "bg-amber-100 text-amber-800"
          : isSelected
          ? "bg-amber-100 text-amber-800"
          : "text-amber-100 bg-amber-800"
      }`}
      onClick={handleClick}
    >
      {data === "Search" ? (
        <FontAwesomeIcon icon={faSearch} className="w-[30px]" />
      ) : (
        data
      )}
    </div>
  );
}
