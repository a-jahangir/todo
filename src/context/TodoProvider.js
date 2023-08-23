import { useCallback, useReducer } from "react";
import TodoContext from "./TodoContext";
import todoreducer from "./todoReducer";
import axios from "axios";
import Swal from "sweetalert2";

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
      dispatch({ type: 'SET_TODOS', payload: [] })
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }, [])

  const filterTodos = async (count) => {
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${count}`)
      dispatch({ type: 'Filter_TODOS', payload: res.data })
      dispatch({ type: 'SET_ERROR', payload: null })
    } catch (err) {
      dispatch({ type: 'Filter_TODOS', payload: [] })
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }
  const createTodos = async (title) => {
    try {
      const res = await axios.post("https://jsonplaceholder.typicode.com/todos", {
        title: title,
        completed: false
      })
      dispatch({ type: 'CREATE_TODOS', payload: res.data })
      dispatch({ type: 'SET_ERROR', payload: null })
      Swal.fire({
        title: "Task added",
        icon: "success",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: 'top'
      })
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }
  const updateTodo = async (todo) => {
    try {
      const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        title: todo.title,
        completed: !todo.completed
      })
      dispatch({ type: 'UPDATE_TODOS', payload: res.data })
      dispatch({ type: 'SET_ERROR', payload: null })
      Swal.fire({
        title: "Task updated",
        icon: "success",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: 'top'
      })
    } catch (err) {
      dispatch({ type: 'UPDATE_TODOS', payload: [] })
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }
  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
      dispatch({ type: 'DELETE_TODOS', payload: todoId })
      dispatch({ type: 'SET_ERROR', payload: null })
      Swal.fire({
        title: "Task Deleted",
        icon: "warning",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
        toast: true,
        position: 'top'
      })
    } catch (err) {
      dispatch({ type: 'DELETE_TODOS', payload: [] })
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }

  return (
    <TodoContext.Provider value={{ ...state, getTodos, filterTodos, createTodos, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
