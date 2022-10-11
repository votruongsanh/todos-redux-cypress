import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeAllTodos } from "../redux/actions/todoActions";
import Footer from "./Footer";
import TodoList from "./TodoList";

const MainSection = () => {
  const { todos } = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();

  const todosCount = todos.length;
  const completedCount = todos.reduce(
    (count, todo) => (todo.completed ? count + 1 : count),
    0
  );

  return (
    <section className="main">
      {!!todosCount && (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            onClick={() => dispatch(completeAllTodos())}
            onChange={() => dispatch(completeAllTodos())}
          />
          <label
            data-cy-toggle-all
            onClick={() => dispatch(completeAllTodos())}
          />
        </span>
      )}
      <TodoList todos={todos} />
      {!!todosCount && (
        <Footer
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
        />
      )}
    </section>
  );
};

export default MainSection;
