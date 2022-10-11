import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { setVisibilityFilter } from "../redux/actions/todoActions";

const Link = ({ children, filter }) => {
  const filterCurrent = useSelector((state) => state.visibilityFilter);
  const dispatch = useDispatch();

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      className={classNames({ selected: filter === filterCurrent })}
      style={{ cursor: "pointer" }}
      onClick={() => dispatch(setVisibilityFilter(filter))}
    >
      {children}
    </a>
  );
};

export default Link;
