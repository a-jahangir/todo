import { useContext, useEffect, useState } from "react"
import TodoContext from "../context/TodoContext"
import FilterTodos from "../components/todos/Filter"
import CreateTodos from "../components/todos/Create"
import UpdateTodo from "../components/todos/Update"
import DeleteTodo from "../components/todos/Delete"

const Todos = () => {
    const { todos, getTodos, error } = useContext(TodoContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            await getTodos();
            setLoading(false);
        })()
    }, [getTodos])

    return (
        <div className="container mt-5">
            <div className="row g-3">
                <CreateTodos />
                <hr />
                <FilterTodos />
                {error && <h1>{error}</h1>}
                {loading && <div className="col-md-12 text-center"><div className="spinner-border mt-5"></div></div>}
                {todos && todos.map(todo => (
                    <div className="col-md-4" key={todo.id}>
                        <div className={"card " + (todo.completed && "bg-light")}>
                            <div className="card-body d-flex align-items-center justify-content-between">
                                <div>{todo.completed ? <del>{todo.title}</del> : <span>{todo.title}</span>}</div>
                                <div className="d-flex align-items-center">
                                    <UpdateTodo todo={todo} />
                                    <DeleteTodo todoId={todo.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Todos