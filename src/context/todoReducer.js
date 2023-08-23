const todoreducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODOS':
            return {
                ...state,
                todos: action.payload
            };
        case 'Filter_TODOS':
            return {
                ...state,
                todos: action.payload
            };
        case 'CREATE_TODOS':
            return {
                ...state,
                todos: [action.payload, ...state.todos]
            };
        case 'UPDATE_TODOS':
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload.id ? { ...todo, completed: action.payload.completed } : todo)
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state

    }
}

export default todoreducer 