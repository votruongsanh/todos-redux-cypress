import {
  ADD_TODO,
  CLEAR_COMPLETED,
  COMPLETE_ALL_TODOS,
  COMPLETE_TODO,
  DELETE_TODO,
  EDIT_TODO,
} from "../contants/actionTypes";

const initialState = (window.Cypress && window.initialState) || {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id:
              state.todos.reduce(
                (maxId, todo) => Math.max(todo.id, maxId),
                -1
              ) + 1,
            completed: false,
            text: action.text,
          },
        ],
      };
    case DELETE_TODO:
      return {
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case EDIT_TODO:
      const todoEdited = state.todos.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );
      return {
        todos: todoEdited,
      };
    case COMPLETE_TODO:
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.todos.every((todo) => todo.completed);
      return {
        todos: state.todos.map((todo) => ({
          ...todo,
          completed: !areAllMarked,
        })),
      };
    case CLEAR_COMPLETED:
      return {
        todos: state.todos.filter((todo) => todo.completed === false),
      };

    default:
      return state;
  }
};

export default todoReducer;
