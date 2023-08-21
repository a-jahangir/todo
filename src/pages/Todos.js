import { useContext, useEffect } from "react"
import TodoContext from "../context/TodoContext"

const Todos = () => {
    const todoContext = useContext(TodoContext)

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then(res => res.json())
            .then(data => {
                todoContext.dispatch({ type: 'SET_TODOS', payload: data })
            })
    }, [])

    return (
        <h2>hi</h2>
    )
}

export default Todos