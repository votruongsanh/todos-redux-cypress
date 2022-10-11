import React from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actions/todoActions";
import TodoTextInput from "./TodoTextInput";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={(text) => {
          if (text.length !== 0) {
            dispatch(addTodo(text));
          }
        }}
        placeholder="What needs to be done?"
      />
    </header>
  );
};

export default Header;
