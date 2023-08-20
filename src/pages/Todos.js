import { useContext } from "react"
import TodoContext from "../context/TodoContext"

const Todos = () => {
    const todoContext = useContext(TodoContext)

    return (
        <h2>hi - {todoContext}</h2>
    )
}

export default Todos