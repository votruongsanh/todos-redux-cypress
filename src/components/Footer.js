/* eslint-disable react/jsx-no-comment-textnodes */
import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCompleted,
  setVisibilityFilter,
} from "../redux/actions/todoActions";
import {
  SHOW_ACTIVE,
  SHOW_ALL,
  SHOW_COMPLETED,
} from "../redux/contants/TodoFilter";
import Link from "./Link";

const FILTER_TITLES = {
  [SHOW_ALL]: "All",
  [SHOW_ACTIVE]: "Active",
  [SHOW_COMPLETED]: "Completed",
};

const Footer = (props) => {
  const { completedCount, activeCount } = props;
  const dispatch = useDispatch();

  const itemWord = activeCount === 1 ? "item" : "items";

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>

      <ul className="filters">
        {Object.keys(FILTER_TITLES).map((filter) => (
          <li key={filter}>
            <Link filter={filter}>{FILTER_TITLES[filter]}</Link>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button
          className="clear-completed"
          onClick={() => dispatch(clearCompleted())}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
