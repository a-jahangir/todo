import { useCallback, useReducer } from "react";
import TodoContext from "./TodoContext";
import todoreducer from "./todoReducer";
import axios from "axios";

const TodoProvider = ({ children }) => {
  const initialState = {
    todos: [],
    error: null
  };
  const [state, dispatch] = useReducer(todoreducer, initialState);
  const getTodos = useCallback(async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos")
      dispatch({ type: 'SET_TODOS', payload: res.data })
      dispatch({ type: 'SET_ERROR', payload: null })
    } catch (err) {
      dispatch({ type: 'SET_TODOS', payload: null })
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }, [])

  return (
    <TodoContext.Provider value={{ ...state, getTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
