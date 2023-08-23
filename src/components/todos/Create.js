import { useContext, useState } from "react"
import TodoContext from "../../context/TodoContext"

const CreateTodos = () => {
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const { createTodos } = useContext(TodoContext)

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (title) {
            await createTodos(title)
        }
        setLoading(false)
    }

    return (
        <>
            <h4>Create Todos :</h4>
            <form onSubmit={(e) => submitHandler(e)} className="row mt-2">
                <div className="col-md-6">
                    <input type="text" onChange={(e) => { setTitle(e.target.value) }} className="form-control" placeholder="Todo title ..." />
                    <div className="form-text text-danger">
                        {title ? '' : 'Title is required'}
                    </div>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-dark">
                        Create
                        {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreateTodos