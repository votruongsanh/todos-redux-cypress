import classNames from "classnames";
import React, { useState } from "react";

const TodoTextInput = ({
  onSave = () => {},
  text = "",
  placeholder,
  editing,
  newTodo,
}) => {
  const [valueInput, setValueInput] = useState(text);

  const handleBlur = (e) => {
    if (!newTodo) {
      onSave(e.target.value);
    }
  };
  const handleChange = (e) => {
    setValueInput(e.target.value);
  };
  const handleSubmit = (e) => {
    const text = e.target.value.trim();
    if (e.which === 13) {
      onSave(text);
      if (newTodo) {
        setValueInput("");
      }
    }
  };

  return (
    <input
      className={classNames({
        edit: editing,
        "new-todo": newTodo,
      })}
      type="text"
      placeholder={placeholder}
      autoFocus={true}
      value={valueInput}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  );
};

export default TodoTextInput;
