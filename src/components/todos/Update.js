import { useContext, useState } from "react"
import TodoContext from "../../context/TodoContext"

const UpdateTodo = ({ todo }) => {
    const [loading, setLoading] = useState(false)
    const { updateTodo } = useContext(TodoContext)

    const updateHandler = async () => {
        setLoading(true)
        await updateTodo(todo)
        setLoading(false)
    }
    return (
        <>
            {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
            {todo.completed ?
                <i onClick={() => updateHandler()} className="bi bi-check-all fs-4 me-2"></i>
                :
                <i onClick={() => updateHandler()} className="bi bi-check fs-4 me-2"></i>
            }
        </>
    )
}

export default UpdateTodo