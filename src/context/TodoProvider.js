import { useReducer } from "react";
import TodoContext from "./TodoContext";
import todoreducer from "./todoReducer";

const TodoProvider = ({ children }) => {
  const initialState = {
    todos: [],
  };
  const [state, dispatch] = useReducer(todoreducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
