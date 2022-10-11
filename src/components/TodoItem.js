import classNames from "classnames";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  completeTodo,
  deleteTodo,
  editTodo,
} from "../redux/actions/todoActions";
import TodoTextInput from "./TodoTextInput";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  const handleSave = (id, text) => {
    if (text.length === 0) {
      dispatch(deleteTodo(id));
    } else {
      dispatch(editTodo(id, text));
    }
    setEditing(false);
  };

  const handleDoubleClick = () => {
    setEditing(true);
  };

  let element;
  if (editing) {
    element = (
      <TodoTextInput
        text={todo.text}
        editing={editing}
        onSave={(text) => handleSave(todo.id, text)}
      />
    );
  } else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(completeTodo(todo.id))}
        />
        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
        <button
          className="destroy"
          onClick={() => dispatch(deleteTodo(todo.id))}
        />
      </div>
    );
  }

  return (
    <li
      className={classNames({
        todo: true,
        completed: todo.completed,
        editing: editing,
      })}
    >
      {element}
    </li>
  );
};

export default TodoItem;
