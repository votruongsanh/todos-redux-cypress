import React from "react";
import { useSelector } from "react-redux";
import {
  SHOW_ACTIVE,
  SHOW_ALL,
  SHOW_COMPLETED,
} from "../redux/contants/TodoFilter";
import TodoItem from "./TodoItem";

const TodoList = ({ todos = [] }) => {
  const filterCurrent = useSelector((state) => state.visibilityFilter);
  // const todosList = () => {
  //   switch (filterCurrent) {
  //     case SHOW_ALL:
  //       return todos;
  //     case SHOW_COMPLETED:
  //       return todos.filter((t) => t.completed);
  //     case SHOW_ACTIVE:
  //       return todos.filter((t) => !t.completed);
  //     default:
  //       throw new Error("Unknown filter: " + filterCurrent);
  //   }
  // };

  const todosList =
    filterCurrent === SHOW_ALL
      ? todos
      : todos.filter((t) => t.completed === (filterCurrent === SHOW_COMPLETED));

  return (
    <ul className="todo-list">
      {todosList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
